const db = require('../pgConnect');

exports.findItems = async (uid, bid, page, perPage, search, filterPriority) => {
    try {    
        const UserBags = await db.sql`SELECT bid FROM bags WHERE uid = ${uid}`;
        if(UserBags.length===0) {
            return Error('User has no bags');
        } else if(!UserBags.some(bag=>bag.bid==bid)) { 
            return Error('This is not your bag!');
        } else {
            const limit = perPage * 2;
            const offset = (perPage * page) - (limit - perPage);
            let hasAnyItems;
            if(search && filterPriority){
                hasAnyItems = await db.sql`SELECT iid, iname, idesc, priority FROM items WHERE bid = ${bid} AND (iname ILIKE '%${search}%' OR idesc ILIKE '%${search}%') AND priority = ${filterPriority} LIMIT ${limit} OFFSET ${offset}`;
            } else if(search) {
                hasAnyItems = await db.sql`SELECT iid, iname, idesc, priority FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) LIMIT ${limit} OFFSET ${offset}`;
            } else if(filterPriority) {
                hasAnyItems = await db.sql`SELECT iid, iname, idesc, priority FROM items WHERE bid = ${bid} AND priority = ${filterPriority} LIMIT ${limit} OFFSET ${offset}`;
            } else {
                console.log("in the original SQL statement");
                hasAnyItems = await db.sql`SELECT iid, iname, idesc, priority FROM items WHERE bid = ${bid} LIMIT ${limit} OFFSET ${offset}`;
            }
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
            return Error('User has no items!');
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