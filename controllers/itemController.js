const Item = require('../models/itemModel');

exports.getItems = (req, res) => {
    Item.findAllItems(req.userData.userID, req.body.bid).then((result)=>{
    if(result instanceof Error)
        throw result;
    else
        res.status(200).json({ data: result });
    }).catch(e=>{
        res.status(404).json({ message: e.message });
    });
};

exports.createItem = (req, res) => {
    let data = processItemOptionals(req.body);
    Item.createItem(req.userData.userID, req.body.bid, data).then((result)=>{
        res.status(201).json({ message: 'New Item Created', data: result });
    }).catch(e=>{
        res.status(500).json({ message: 'Item could not be created!' });
    });
};

exports.editItem = (req, res) => {
    let data = processItemOptionals(req.body);
    Item.editItem(req.params.id, req.userData.userID, data).then((result)=>{
        if(result instanceof Error)
            throw result;
        else
            res.status(200).json({ message: 'Item has been Updated!', data: result});
    }).catch(e=>{
        res.status(500).json({ message: `${e.message} Item could not be updated!` });
    });
};

exports.deleteItem = (req, res) => {
    Item.deleteItem(req.params.id, req.userData.userID).then((result)=>{
        if(result instanceof Error)
            throw result;
        else
            res.status(200).json({ message: 'Item has been Deleted!', data: result});
    }).catch(e=>{
        res.status(500).json({ message: `${e.message} Item could not be deleted!` });
    });
};

function processItemOptionals(data) {
    if(!data.image)
        data.image = null;
    if(!data.ivolume)
        data.ivolume = null;
    if(!data.iweight)
        data.iweight = null;
    if(!data.priority)
        data.priority = null;
    return data;
};