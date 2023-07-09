const SignUp = require('../models/signupModel');

exports.signup = (req, res) => {
    /* console.log('Here');
    const data = req.body;
    res.json({ message: data });    */

    console.log('SignUp Controller');

    const result = SignUp.post(req.body);
    
    res.status(201).json({ message: 'New User Created', data: result});

};