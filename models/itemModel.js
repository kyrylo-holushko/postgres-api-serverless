const db = require('../pgConnect');

exports.findAllItems = async (uid, bid) => {
    try {
        const UserBags = await db.sql`SELECT bid FROM bags WHERE uid = ${uid}`;
        if(UserBags.length===0) {
            return Error('User has no bags');
        } else if(!UserBags.some(bag=>bag.bid==bid)) { 
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
            return Error('User has no bags!');
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
        const UserItems = await db.sql`SELECT items.iid FROM items INNER JOIN bags ON items.bid = bags.bid WHERE bags.uid = ${uid}`;
        if(UserItems.length===0) {
            return Error('User has no bags!');
        } else if(!UserItems.some(item=>item.iid==iid)) {
            return Error('This is not your item!');
        } else {
            const result = await db.sql`UPDATE items SET iname=${data.iname}, idesc=${data.idesc}, image=${data.image}, ivolume=${data.ivolume}, iweight=${data.iweight}, priority=${data.priority} WHERE iid = ${iid} RETURNING *`;
            return result[0];
        }
    } catch(error) {
        console.log(error);
    }  
};

exports.deleteItem = async (iid, uid) => {
    try {
        const UserItems = await db.sql`SELECT items.iid FROM items INNER JOIN bags ON items.bid = bags.bid WHERE bags.uid = ${uid}`;
        if(UserItems.length===0) {
            return Error('User has no bags!');
        } else if(!UserItems.some(item=>item.iid==iid)) {
            return Error('This is not your item!');
        } else {
            const result = await db.sql`DELETE FROM items WHERE iid = ${iid} RETURNING *`;
            return result[0];
        }
    } catch(error) {
        console.log(error);
    }  
};