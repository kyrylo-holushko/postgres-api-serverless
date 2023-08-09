const Move = require('../models/moveModel');

exports.moveAllItems = (req, res) => {
    Move.moveAllItems(req.userData.userID, req.body).then((result)=>{
        if(result instanceof Error)
            throw result;
        else
            res.status(200).json({ message: 'Items have been transfered!', data: result });
    }).catch(e=>{
        res.status(500).json({ message: `${e.message} Items could not be transfered!` });
    });
};

exports.moveOneItem = (req, res) => {
    Move.moveOneItem(req.userData.userID, req.nbid, req.params.id).then((result)=>{
        if(result instanceof Error)
            throw result;  
        else
            res.status(200).json({ message: 'Item has been transfered!', data: result});
    }).catch(e=>{
        res.status(500).json({ message: `${e.message} Item could not be transfered!` });
    });
};