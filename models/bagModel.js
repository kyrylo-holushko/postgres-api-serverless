const db = require('../pgConnect');

exports.findAllBags = async (uid) => {
    try {
        const hasAnyBags = await db.sql`SELECT bid, bname FROM bags WHERE uid = ${uid}`;
        if(hasAnyBags.length===0)
            return Error('You do not have any bags. Would you like to create a bag?');
        else
            return hasAnyBags;
    } catch(error) {
        console.log(error);
    }
};

exports.createBag = async (data, uid) => {
    try {
        const result = await db.sql`INSERT INTO bags (bname, bvolume, bweight, uid) VALUES (${data.bname}, ${data.bvolume}, ${data.bweight}, ${uid}) RETURNING *`;
        return result[0];
    } catch(error) {
        console.log(error);
    }   
};

exports.editBag = async (bid, uid, data) => {
    try {
        console.log('BAG ID:', bid);
        console.log('USER ID:', uid);
        const BagExists = await db.sql`SELECT * FROM bags WHERE bid = ${bid}`;
        if(BagExists.length===0){
            return Error('This bag does not exist.');
        } else if(BagExists[0].uid!==uid){
            return Error('This is not your bag!');
        } else {
            let { bid, uid, ...bag } = BagExists[0];
            console.log('Checking if exsiting',bag.bid);
            Object.entries(data).forEach(([key,value])=>{
                bag[key]=value;
            });
            console.log('Bag to Be updated', bag);
            const result = await db.sql`UPDATE bags SET bname=${bag.bname}, bvolume=${bag.bvolume}, bweight=${bag.bweight} WHERE bid = ${bid} RETURNING *`;
            return result[0];
        }
    } catch(error) {
        console.log(error);
    }   
};

//UPDATE bags SET ${query} WHERE bid = ${bid} RETURNING *