const db = require('../pgConnect');

exports.post = async (user) => {
    try {
        const UserExists = await db.sql`SELECT * FROM users WHERE email = ${user.email}`;
        if(UserExists.length>0){
            return Error('An account with this email already exists!');
        }
        const result = await db.sql`INSERT INTO users (username, email, password) VALUES (${user.username}, ${user.email}, ${user.password}) RETURNING *`;
        return result[0];
    } catch(error) {
        console.log(error);
    }  
};