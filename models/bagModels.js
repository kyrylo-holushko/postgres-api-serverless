const db = require('../pgConnect');

exports.findAllBags = async (uid) => {
    try {
        const hasAnyBags = await db.sql`SELECT bid, bname FROM users WHERE uid = ${uid}`;
        if(!hasAnyBags)
            return Error('You do not have any bags. Would you like to create a bag?');
        else
            return hasAnyBags;
    } catch(error) {
        console.log(error);
    }
};