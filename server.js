const express = require('express');
const app = express();
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const multer = require('multer');

/* Multipart Form Data */

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* Controllers */

const userController = require('./controllers/userController');
const bagController = require('./controllers/bagController');
const itemController = require('./controllers/itemController');
const moveController = require('./controllers/moveController');

dotenv.config();
const { PORT, JWTSECRET } = process.env;

app.use(cors());

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

app.get('/', (req, res) => {
    res.json({ message: 'root'});
});

/* USER CRUD */

app.post('/api/user/signup', singUpLimiter, userController.signup);
app.post('/api/user/login', userController.login);
app.put('/api/user/update',  checkAuth, userController.updateUser);
app.delete('/api/user/delete', checkAuth, userController.deleteUser);

app.post('/api/user/password/link', /*passwordResetLimiter*/userController.passwordLink);
app.put('/api/user/password/new', checkAuth, userController.passwordNew);

/* BAG CRUD */

app.get('/api/bags', checkAuth, bagController.getBags);
app.post('/api/bags', checkAuth, bagController.createBag);
app.put('/api/bags/:id', checkAuth, bagController.editBag);
app.delete('/api/bags/:id', checkAuth, bagController.deleteBag);

/* ITEM CRUD */

app.get('/api/items', checkAuth, itemController.getItems);
app.post('/api/items', checkAuth, upload.single('image'), itemController.createItem);
app.put('/api/items/:id', checkAuth, itemController.editItem);
app.delete('/api/items/:id', checkAuth, itemController.deleteItem);

app.put('/api/move/items', checkAuth, moveController.moveAllItems);
app.put('/api/move/item/:id', checkAuth, moveController.moveOneItem);


app.all('*', (req, res) => {
    res.status(404).json({ message: '404 Page Not Found' });
});

app.listen(PORT, ()=>{console.log("API listening on: " + PORT)});