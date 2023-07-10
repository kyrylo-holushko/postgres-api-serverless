const SignUp = require('../models/signupModel');
const bcrypt = require('bcrypt');

/* encrypt = async (password) => {
    const salted = await bcrypt.hash(data.password, 10);
    console.log('Inside encrypt, after hashing', salted);
    return salted;
}; */

exports.signup = (req, res) => {
    if(req.body.password!==req.body.passwordConfirmed)
        res.status(500).json({ message: "Passwords don't match, Account not created!"}) 
    else {
        let { passwordConfirmed, ...data } = req.body;
        bcrypt.hash(data.password, 10).then(hash=>{data.password = hash;});
        console.log('Encrypted Password is: ', data.password);
        console.log('SignUp Controller');
        const result = SignUp.post(data);
        if((typeof result)=="string")
            res.status(500).json({ message: result });
        else 
            res.status(201).json({ message: 'New User Created', data: result});
    }
};