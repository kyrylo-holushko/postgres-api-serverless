const express = require('express');
const app = express();
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

/* Controllers */
const signupController = require('./controllers/signupController');
const loginController = require('./controllers/loginController');
const bagController = require('./controllers/bagController');

dotenv.config();
const { PORT, JWTSECRET } = process.env;

app.use(express.json({ limit: '1kb' }));

/* MIDDLEWARE */

const singUpLimiter = rateLimit({
  max: 4, // 4 requests per hour
  windowMs: 60 * (60000), //60 minutes limit
  message: 'Too many accounts created from this IP, please try again after an hour',
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
    req.userData = {userID: decodedToken.uid};
    next();
  } catch(error){
    return next(error);
  }
};


/* ROUTES */

app.get('/', (req, res) => {
  res.json({ message: 'root'});
});

app.post('/api/signup', singUpLimiter, signupController.signup);
app.post('/api/login', loginController.login);

/* BAG CRUD */
app.get('/api/bags', checkAuth, bagController.getBags);
app.post('/api/bags', checkAuth, bagController.createBag);
app.put('/api/bags/:id', checkAuth, bagController.editBag);
app.delete('/api/bags/:id', checkAuth, bagController.deleteBag);

app.all('*', (req, res) => {
  res.status(404).json({ message: '404 Page Not Found' });
});

app.listen(PORT, ()=>{console.log("API listening on: " + PORT)});