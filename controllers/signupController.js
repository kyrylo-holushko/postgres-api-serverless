exports.signup = (req, res) => {
    console.log('Here');
    const data = req.body;
    res.json({ message: data });   
};