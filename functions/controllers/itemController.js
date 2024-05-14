const Item = require('../models/itemModel');

exports.getItems = (req, res) => {
    Item.findItems(
        req.userData.userID, 
        req.query.bag, 
        req.query.page, 
        req.query.perPage, 
        req.query.search, 
        req.query.filterPriority,
        req.query.column,
        req.query.order
        ).then((result)=>{
    if(result instanceof Error){
        throw result;
    } else {
        res.status(200).json({ data: result });}
    }).catch(e=>{
        res.status(404).json({ message: e.message });
    });
};

exports.createItem = (req, res) => {
    let data = processItemOptionals(req.body, req.file);
    Item.createItem(req.userData.userID, req.body.bid, data).then((result)=>{
        if(result instanceof Error)
            throw result;
        else
            res.status(201).json({ message: 'New Item Created', data: result });
    }).catch(e=>{
        res.status(500).json({ message: `${e.message} Item could not be created!` });
    });
};

exports.editItem = (req, res) => {
    let data = processItemOptionals(req.body, req.file);
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

function processItemOptionals(bodyData, fileData) {
    if(bodyData.image!=="keep"){
        if(!fileData){
            bodyData.image = null;
            bodyData.mimetype = null;
        } else {
            bodyData.image = Buffer.from(fileData.buffer).toString('base64');
            bodyData.mimetype = fileData.mimetype;
        }
    }

    if(!bodyData.ivolume)
        bodyData.ivolume = null;
    if(!bodyData.iweight)
        bodyData.iweight = null;
    if(!bodyData.priority)
        bodyData.priority = null;

    return bodyData;
};