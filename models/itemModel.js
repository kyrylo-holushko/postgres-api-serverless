const db = require('../pgConnect');

exports.findAllItems = async (uid, bid) => {
    try {
        const UserBags = await db.sql`SELECT bid FROM bags WHERE uid = ${uid}`;
        if(UserBags.length===0) {
            return Error('This bag does not exist.');
        } else if(UserBags.some(bag=>bag.bid!==bid)) { 
            return Error('This is not your bag!');
        } else {
            const hasAnyItems = await db.sql`SELECT iid, iname, idesc FROM items WHERE bid = ${bid}`;
            if(hasAnyItems.length===0)
                return Error('You do not have any items in this bag.');
            else
                return hasAnyItems;
        } 
    } catch(error) {
        console.log(error);
    }
};

exports.createItem = async (uid, bid, data) => {
    try {
        const UserBags = await db.sql`SELECT bid FROM bags WHERE uid = ${uid}`;
        if(UserBags.length===0) {
            return Error('This bag does not exist.');
        } else if(!UserBags.some(bag=>bag.bid==bid)) { 
            return Error('This is not your bag!');
        } else {
            const result = await db.sql`INSERT INTO items (iname, idesc, image, ivolume, iweight, priority, bid) VALUES (${data.iname}, ${data.idesc}, ${data.image}, ${data.ivolume}, ${data.iweight}, ${data.priority}, ${bid}) RETURNING *`;
            return result[0];
        } 
    } catch(error) {
        console.log(error);
    }
};

exports.editItem = async (iid, uid, data) => {
    try {


    } catch(error) {
        console.log(error);
    }  
};

exports.deleteItem = async (iid, uid) => {


};

/* try {
    const BagExists = await db.sql`SELECT * FROM bags WHERE bid = ${bid}`;
    if(BagExists.length===0){
        return Error('This bag does not exist.');
    } else if(BagExists[0].uid!==uid){
        return Error('This is not your bag!');
    } else {
        const result = await db.sql`UPDATE bags SET bname=${data.bname}, bvolume=${data.bvolume}, bweight=${data.bweight} WHERE bid = ${bid} RETURNING *`;
        return result[0];
    }
} catch(error) {
    console.log(error);
}    */