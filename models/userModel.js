const db = require('../pgConnect');

exports.createUser = async (user) => {
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

exports.checkEmail = async (email) => {
    try {
        const EmailExists = await db.sql`SELECT uid, username, password FROM users WHERE email = ${email}`;
        if(EmailExists.length===0)
            return Error('No account with this email exists!');
        else 
            return EmailExists[0];
    } catch(error) {
        console.log(error);
    }
};

exports.checkUsername = async (username) => {
    try {
        const UserNameExists = await db.sql`SELECT uid, username, password FROM users WHERE username = ${username}`;
        if(UserNameExists.length===0)
            return Error('No account with this username exists!');
        else
            return UserNameExists[0];
    } catch(error) {
        console.log(error);
    }
};