const Login = require('../models/loginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { JWTSECRET, JWTEXPIRY } = process.env;

exports.login = (req, res) => {
    const { usernameOrEmail, password } = req.body;
    let data;
    if(/@/.test(usernameOrEmail)){
        Login.checkEmail(usernameOrEmail).then((result) => {
            if(result instanceof Error)
                throw result;
            else
                compareAndEncrypt(password, result, res);
        }).catch(e=>{
            res.status(500).json({ message: e.message });
        });
    }     
    else {
        Login.checkUsername(usernameOrEmail).then((result) => {
            if(result instanceof Error)
                throw result;
            else
                compareAndEncrypt(password, result, res);
        }).catch(e=>{
            res.status(500).json({ message: e.message });
        });
    }
};

function compareAndEncrypt(password, data, res) {
    bcrypt.compare(password, data.password).then((result) => {
        if (result === true) {
            const token = jwt.sign({ UserId: data.id, UserName: data.username }, JWTSECRET, { expiresIn: JWTEXPIRY });
            res.json({ message: 'login successful', token: token });
        } else {
            res.json({ message: 'Could not log in. Passwords do not match!' });
        }
    });  
};
