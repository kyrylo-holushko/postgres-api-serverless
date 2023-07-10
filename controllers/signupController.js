const SignUp = require('../models/signupModel');
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    if(req.body.password!==req.body.passwordConfirmed)
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