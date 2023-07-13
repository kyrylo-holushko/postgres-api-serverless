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

exports.createBag = async (data) => {
    try {
        const result = await db.sql`INSERT INTO bags (bname, bvolume, bweight, uid) VALUES (${data.bname}, ${data.bvolume}, ${data.bweight}, ${data.uid}) RETURNING *`;
        return result[0];
    } catch(error) {
        console.log(error);
    }   
};