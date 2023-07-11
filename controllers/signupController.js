const SignUp = require('../models/signupModel');
const email = require("email-validator");
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    const usernameRegEx = RegExp(/^[a-zA-Z0-9]{1,15}$/);
    if(!usernameRegEx.test(req.body.username))
        res.status(500).json({ message: "Username must be alphanumeric only and no more than 15 characters!"});
    else if(!email.validate(req.body.email))
        res.status(500).json({ message: "Email entered is not a valid email!"});
    else if(req.body.password!==req.body.passwordConfirmed)
        res.status(500).json({ message: "Passwords don't match, Account not created!"}) 
    else {
        let { passwordConfirmed, ...data } = req.body;
        bcrypt.hash(data.password, 10).then(hash=>{data.password = hash;}).catch(e=>{console.log('Encryption Failed.')});
        SignUp.post(data).then((result)=>{
            if(result instanceof Error)
                throw result;
            else
                res.status(201).json({ message: 'New User Created', data: result});
        }).catch(e=>{
            res.status(500).json({ message: e.message });
        });
    }
};