const Bag = require('../models/bagModels');

exports.getBags = (req, res) => {
    Bag.findAllBags(req.params.id).then((result)=>{
        if(result instanceof Error)
            throw result;
        else
            console.log('Returned Result', result);
            res.status(200).json({ data: result });
    }).catch(e=>{
        res.status(404).json({ message: e.message });
    });
    //get all bags associated with user id

}

exports.createBag = (req, res) => {
    let { bvolume, bweight, ...data } = req.body;
    if(!bvolume)
        data.bvolume = null;
    if(!bweight)
        data.bweight = null;
    Bag.createBag(data).then((result)=>{
        res.status(201).json({ message: 'New Bag Created', data: result });
    }).catch(e=>{
        res.status(500).json({ message: 'Bag could not be created!' });
    });
}


exports.editBag = (req, res) => {
    //edit bname, for starters
    //FROM PATCH route

    // [OPTIONAL] edit bvolume and bweight

}

exports.deleteBag = (req, res) => {
    // check if bag is empty first
    // ask user if they want to move items to another bag first, change item FK bid to another bag
    // if not tell them it will delete all the contents of the bag
    /*
        1. delete items with FK bid of the bag

            THEN

        2. delete the bag with PK bid
    
    */


}