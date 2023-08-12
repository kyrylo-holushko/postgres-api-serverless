const db = require('../pgConnect');

exports.createUser = async (data) => {
    try {
        const UserExists = await db.sql`SELECT * FROM users WHERE email = ${data.email}`;
        if(UserExists.length>0){
            return Error('An account with this email already exists!');
        }
        const result = await db.sql`INSERT INTO users (username, email, password) VALUES (${data.username}, ${data.email}, ${data.password}) RETURNING *`;
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

exports.updateUser = async (uid, data) => {
    try {
        const result = await db.sql`UPDATE users SET username=${data.username}, email=${data.email}, password=${data.password} WHERE uid = ${uid} RETURNING *`;
        return result[0];
    } catch(error) {
        console.log(error);
    }
};

exports.deleteUser = async (uid) => {
    try {
        const result = await db.sql`DELETE FROM users WHERE uid = ${uid} RETURNING *`; //delete user with uid
        return result[0];
    } catch(error) {
        console.log(error);
    }
};