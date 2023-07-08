const express = require('express');
const app = express();
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

/* Controllers */
const signupController = require('./controllers/signupController');

dotenv.config();
const { PORT } = process.env;

app.use(express.json({ limit: '1kb' }));

const singUpLimiter = rateLimit({
  max: 4, // 4 requests per hour
  windowMs: 60 * (60000), //60 minutes limit
  message: 'Too many accounts created from this IP, please try again after an hour',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


/* ROUTES */

app.get('/', (req, res) => {
  res.json({ message: 'root'});
});

app.post('/api/signup', singUpLimiter, signupController.signup);


app.listen(PORT, ()=>{
    console.log("API listening on: " + PORT);
});