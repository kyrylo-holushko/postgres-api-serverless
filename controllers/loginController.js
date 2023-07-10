const Login = require('../models/loginModel');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const { usernameOrEmail, password } = req.boy;
    let data;
    if(/@/.test(usernameOrEmail)){
        Login.checkEmail(usernameOrEmail, password).then((result) => {
            if(result instanceof Error)
                throw result;
            else
                data = result;
        }).catch(e=>{
            res.status(500).json({ message: e.message });
        });
    }     
    else {
        Login.checkUsername(usernameOrEmail, password).then((result) => {
            if(result instanceof Error)
                throw result;
            else
                data = result;
        }).catch(e=>{
            res.status(500).json({ message: e.message });
        });
    }
    bcrypt.compare(password, data.password).then((result) => {
        if (result === true) {
            // generate jwt.sign using data.id
        } else {
            res.status(500).json({ message: 'Could not log in. Passwords do not match!'});
        }
    });  
};