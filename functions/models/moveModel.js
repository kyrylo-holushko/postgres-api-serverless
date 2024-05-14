const db = require('../pgConnect');

exports.moveAllItems = async (uid, data) => {
    // data.obid "old bag id"
    // data.nbid "new bag id"
    try {
        const BagExists = await db.sql`SELECT * FROM bags WHERE bid = ${data.obid}`;
        if(BagExists.length===0){
            return Error('This bag does not exist.');
        } else if(BagExists[0].uid!==uid){
            return Error('This is not your bag!');
        } else {
            const BagExists = await db.sql`SELECT * FROM bags WHERE bid = ${data.nbid}`;
            if(BagExists.length===0){
                return Error('This bag does not exist.');
            } else if(BagExists[0].uid!==uid){
                return Error('This is not your bag!');
            } else {
                const results = await db.sql`UPDATE items SET bid=${data.nbid} WHERE bid = ${data.obid} RETURNING *`;
                return results;
            }      
        }
    } catch(error) {
        console.log(error);
    }  
};

exports.moveOneItem = async (uid, nbid, iid) => {
    try {
        const UserItems = await db.sql`SELECT items.iid FROM items INNER JOIN bags ON items.bid = bags.bid WHERE bags.uid = ${uid}`;
        if(UserItems.length===0) {
            return Error('User has no items!');
        } else if(!UserItems.some(item=>item.iid==iid)) {
            return Error('This is not your item!');
        } else {
            const result = await db.sql`UPDATE items SET bid=${nbid} WHERE iid = ${iid} RETURNING *`;
            return result[0];
        }
    } catch(error) {
        console.log(error);
    }
};