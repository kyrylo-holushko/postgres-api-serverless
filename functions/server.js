const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const multer = require('multer');
const helmet = require('helmet');

/* Multipart Form Data */

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* Controllers */

const userController = require('../src/controllers/userController');
const bagController = require('../src/controllers/bagController');
const itemController = require('../src/controllers/itemController');
const moveController = require('../src/controllers/moveController');

dotenv.config();
const { PORT, JWTSECRET } = process.env;

const port = PORT || 8080;

app.use('/.netlify/functions/server', router);
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '1mb' }));

/* MIDDLEWARE */

const singUpLimiter = rateLimit({
    max: 4, // 4 requests per hour
    windowMs: 60 * (60000), //60 minutes limit
    message: 'Too many accounts created from this IP, please try again after an hour',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const passwordResetLimiter = rateLimit({
    max: 3, // 3 requests per 24 hours
    windowMs: 24 * 60 * (60000), //24 hour limit
    message: 'Too many password resets, please check your email for your latest reset link',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

checkAuth = (req, res, next) => {
    if(req.method==='OPTIONS')
        return next();
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
        throw Error('Authentication Failed!');
        }
        const decodedToken = jwt.verify(token, JWTSECRET);
        req.userData = {userID: decodedToken.uid, userEmail: decodedToken.email};
        next();
    } catch(error){
        return next(error);
    }
};

/* ROUTES */

router.get('/', (req, res) => {
    res.json({ message: 'root'});
});

/* USER CRUD */

router.post('/api/user/signup', singUpLimiter, userController.signup);
router.post('/api/user/login', userController.login);
router.put('/api/user/update',  checkAuth, userController.updateUser);
router.delete('/api/user/delete', checkAuth, userController.deleteUser);

router.post('/api/user/password/link', passwordResetLimiter, userController.passwordLink);
router.put('/api/user/password/new', checkAuth, userController.passwordNew);

/* BAG CRUD */

router.get('/api/bags', checkAuth, bagController.getBags);
router.post('/api/bags', checkAuth, bagController.createBag);
router.put('/api/bags/:id', checkAuth, bagController.editBag);
router.delete('/api/bags/:id', checkAuth, bagController.deleteBag);

/* ITEM CRUD */

router.get('/api/items', checkAuth, itemController.getItems);
router.post('/api/items', checkAuth, upload.single('image'), itemController.createItem);
router.put('/api/items/:id', checkAuth, upload.single('image'), itemController.editItem);
router.delete('/api/items/:id', checkAuth, itemController.deleteItem);

router.put('/api/move/items', checkAuth, moveController.moveAllItems);
router.put('/api/move/item/:id', checkAuth, moveController.moveOneItem);


router.all('*', (req, res) => {
    res.status(404).json({ message: '404 Page Not Found' });
});

//app.listen(port, ()=>{console.log("API listening on: " + port)});


export const handler = serverless(app);