const db = require('../pgConnect');

exports.findItems = async (uid, bid, page, perPage, search, filterPriority, column, order) => {
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
            //const orderstr = DESC;
            //console.log("search, filterPriority, column, order", search, filterPriority, column, order);
            if(search && filterPriority){
                if(order!=='null'){
                    switch(column){
                        case "iname":
                            if(order==="ASC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) AND priority = ${filterPriority} ORDER BY iname ASC LIMIT ${limit} OFFSET ${offset}`;
                            if(order==="DESC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) AND priority = ${filterPriority} ORDER BY iname DESC LIMIT ${limit} OFFSET ${offset}`;
                            break;
                        case "idesc":
                            if(order==="ASC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) AND priority = ${filterPriority} ORDER BY idesc ASC LIMIT ${limit} OFFSET ${offset}`;
                            if(order==="DESC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) AND priority = ${filterPriority} ORDER BY idesc DESC LIMIT ${limit} OFFSET ${offset}`;
                            break;
                        case "priority":
                            if(order==="ASC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) AND priority = ${filterPriority} ORDER BY priority ASC LIMIT ${limit} OFFSET ${offset}`;
                            if(order==="DESC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) AND priority = ${filterPriority} ORDER BY priority DESC LIMIT ${limit} OFFSET ${offset}`;
                            break;
                    }
                    //hasAnyItems = await db.sql`SELECT iid, iname, idesc, priority FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) AND priority = ${filterPriority} ORDER BY ${column} ${order} LIMIT ${limit} OFFSET ${offset}`;
                } else {
                    hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) AND priority = ${filterPriority} LIMIT ${limit} OFFSET ${offset}`;
                }
            } else if(search) {
                if(order!=='null'){
                    switch(column){
                        case "iname":
                            if(order==="ASC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) ORDER BY iname ASC LIMIT ${limit} OFFSET ${offset}`;
                            if(order==="DESC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) ORDER BY iname DESC LIMIT ${limit} OFFSET ${offset}`;
                            break;
                        case "idesc":
                            if(order==="ASC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) ORDER BY idesc ASC LIMIT ${limit} OFFSET ${offset}`;
                            if(order==="DESC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) ORDER BY idesc DESC LIMIT ${limit} OFFSET ${offset}`;
                            break;
                        case "priority":
                            if(order==="ASC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) ORDER BY priority ASC LIMIT ${limit} OFFSET ${offset}`;
                            if(order==="DESC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) ORDER BY priority DESC LIMIT ${limit} OFFSET ${offset}`;
                            break;
                    }
                    //hasAnyItems = await db.sql`SELECT iid, iname, idesc, priority FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) ORDER BY ${column} ${order} LIMIT ${limit} OFFSET ${offset}`;
                } else {
                    hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND (iname ILIKE ${ '%' + search + '%' } OR idesc ILIKE ${ '%' + search + '%' }) LIMIT ${limit} OFFSET ${offset}`;
                }
            } else if(filterPriority) {
                if(order!=='null') {
                    switch(column){
                        case "iname":
                            if(order==="ASC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND priority = ${filterPriority} ORDER BY iname ASC LIMIT ${limit} OFFSET ${offset}`;
                            if(order==="DESC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND priority = ${filterPriority} ORDER BY iname DESC LIMIT ${limit} OFFSET ${offset}`;
                            break;
                        case "idesc":
                            if(order==="ASC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND priority = ${filterPriority} ORDER BY idesc ASC LIMIT ${limit} OFFSET ${offset}`;
                            if(order==="DESC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND priority = ${filterPriority} ORDER BY idesc DESC LIMIT ${limit} OFFSET ${offset}`;
                            break;
                        case "priority":
                            if(order==="ASC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND priority = ${filterPriority} ORDER BY priority ASC LIMIT ${limit} OFFSET ${offset}`;
                            if(order==="DESC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND priority = ${filterPriority} ORDER BY priority DESC LIMIT ${limit} OFFSET ${offset}`;
                            break;
                    }
                    //hasAnyItems = await db.sql`SELECT iid, iname, idesc, priority FROM items WHERE bid = ${bid} AND priority = ${filterPriority} ORDER BY ${column} ${order} LIMIT ${limit} OFFSET ${offset}`;
                } else {
                    hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} AND priority = ${filterPriority} LIMIT ${limit} OFFSET ${offset}`;
                }
            } else {
                //console.log("Got to here!");
                if(order!=='null') {
                    switch(column){
                        case "iname":
                            if(order==="ASC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} ORDER BY iname ASC LIMIT ${limit} OFFSET ${offset}`;
                            if(order==="DESC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} ORDER BY iname DESC LIMIT ${limit} OFFSET ${offset}`;
                            break;
                        case "idesc":
                            if(order==="ASC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} ORDER BY idesc ASC LIMIT ${limit} OFFSET ${offset}`;
                            if(order==="DESC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} ORDER BY idesc DESC LIMIT ${limit} OFFSET ${offset}`;
                            break;
                        case "priority":
                            if(order==="ASC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} ORDER BY priority ASC LIMIT ${limit} OFFSET ${offset}`;
                            if(order==="DESC")
                                hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} ORDER BY priority DESC LIMIT ${limit} OFFSET ${offset}`;
                            break;
                    }
                    //console.log("ordered");
                    //hasAnyItems = await db.sql`SELECT iid, iname, idesc, priority FROM items WHERE bid = ${bid} ORDER BY ${''+column} ${''+order} LIMIT ${limit} OFFSET ${offset}`;
                } else {
                    //console.log("un-ordered");
                    hasAnyItems = await db.sql`SELECT iid, iname, image, idesc, priority, mimetype FROM items WHERE bid = ${bid} LIMIT ${limit} OFFSET ${offset}`;
                }
            }
            if(hasAnyItems.length===0) {
                return Error('You do not have any items in this bag.');}
            else {
                console.log("Returning", hasAnyItems);
                return hasAnyItems;}
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
            const result = await db.sql`INSERT INTO items (iname, idesc, image, ivolume, iweight, priority, bid, mimetype) VALUES (${data.iname}, ${data.idesc}, ${data.image}, ${data.ivolume}, ${data.iweight}, ${data.priority}, ${bid}, ${data.mimetype}) RETURNING *`;
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