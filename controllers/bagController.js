const Bag = require('../models/bagModel');

exports.getBags = (req, res) => {
    Bag.findAllBags(req.userData.userID).then((result)=>{
        if(result instanceof Error)
            throw result;
        else
            console.log('Returned Result', result);
            res.status(200).json({ data: result });
    }).catch(e=>{
        res.status(404).json({ message: e.message });
    });
};

exports.createBag = (req, res) => {
    let { ...data } = req.body;
    if(!data.bvolume)
        data.bvolume = null;
    if(!data.bweight)
        data.bweight = null;
    Bag.createBag(data, req.userData.userID).then((result)=>{
        res.status(201).json({ message: 'New Bag Created', data: result });
    }).catch(e=>{
        res.status(500).json({ message: 'Bag could not be created!' });
    });
};


exports.editBag = (req, res) => {
    const queryString = queryBuilder(req.body);
    console.log('Assembled query string:',queryString);
    Bag.editBag(req.params.id, req.userData.userID, queryString).then((result)=>{
        if(result instanceof Error)
            throw result;
        else
            res.status(200).json({ message: 'Bag has been Updated!', data: result});
    }).catch(e=>{
        res.status(500).json({ message: `${e.message} Bag could not be updated!`});
    });
};

exports.deleteBag = (req, res) => {
    // check if bag is empty first
    // ask user if they want to move items to another bag first, change item FK bid to another bag
    // if not tell them it will delete all the contents of the bag
    /*
        1. delete items with FK bid of the bag

            THEN

        2. delete the bag with PK bid
    
    */
};

function queryBuilder(data) {
    let setString = '';
    Object.entries(data).forEach(([key, value]) => {
        setString += `${key} = ${value}, `;
    });
    //
    return 'bname = Handbag, bweight = 10';//setString.slice(0, setString.length-2);
};