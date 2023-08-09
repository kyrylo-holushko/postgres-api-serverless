const Bag = require('../models/bagModel');

exports.getBags = (req, res) => {
    Bag.findAllBags(req.userData.userID).then((result)=>{
        if(result instanceof Error)
            throw result;
        else
            res.status(200).json({ data: result });
    }).catch(e=>{
        res.status(404).json({ message: e.message });
    });
};

exports.createBag = (req, res) => {
    let data = processBagOptionals(req.body);
    Bag.createBag(data, req.userData.userID).then((result)=>{
        res.status(201).json({ message: 'New Bag Created', data: result });
    }).catch(e=>{
        res.status(500).json({ message: 'Bag could not be created!' });
    });
};


exports.editBag = (req, res) => {
    let data = processBagOptionals(req.body);
    Bag.editBag(req.params.id, req.userData.userID, data).then((result)=>{
        if(result instanceof Error)
            throw result;
        else
            res.status(200).json({ message: 'Bag has been Updated!', data: result});
    }).catch(e=>{
        res.status(500).json({ message: `${e.message} Bag could not be updated!` });
    });
};

exports.deleteBag = (req, res) => {
    Bag.deleteBag(req.params.id, req.userData.userID).then((result)=>{
        if(result instanceof Error)
            throw result;
        else
            res.status(200).json({ message: 'Bag has been Deleted!', data: result});
    }).catch(e=>{
        res.status(500).json({ message: `${e.message} Bag could not be deleted!` });
    });
};

function processBagOptionals(data) {
    if(!data.bvolume)
        data.bvolume = null;
    if(!data.bweight)
        data.bweight = null;
    return data;
};


    // check if bag is empty first, then delete
    // otherewise:
    
    // ask user if they want to move items to another bag first, change item FK bid to another bag
    // if not tell them it will delete all the contents of the bag
    /*
        1. delete items with FK bid of the bag

            THEN

        2. delete the bag with PK bid
    
    */