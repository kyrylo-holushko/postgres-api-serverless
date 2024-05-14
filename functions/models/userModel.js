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
        const EmailExists = await db.sql`SELECT uid, username, email, password FROM users WHERE email = ${email}`;
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
        const UserNameExists = await db.sql`SELECT uid, username, email, password FROM users WHERE username = ${username}`;
        if(UserNameExists.length===0)
            return Error('No account with this username exists!');
        else
            return UserNameExists[0];
    } catch(error) {
        console.log(error);
    }
};

exports.updateUser = async (uid, oldmail, data) => {
    try {
        const UserExists = await db.sql`SELECT * FROM users WHERE email = ${data.email} AND email != ${oldmail}`;
        if(UserExists.length>0){
            return Error('An account with this email already exists!');
        }
        const result = await db.sql`UPDATE users SET username=${data.username}, email=${data.email} WHERE uid = ${uid} RETURNING *`;
        return result[0];
    } catch(error) {
        console.log(error);
    }
};

exports.deleteUser = async (uid) => {
    try {
        const result = await db.sql`DELETE FROM users WHERE uid = ${uid} RETURNING *`;
        return result[0];
    } catch(error) {
        console.log(error);
    }
};

exports.storeResetToken = async (email, token) => {
    try {
        const result = await db.sql`UPDATE users SET reset_password_token=${token} WHERE email = ${email} RETURNING *`;
        return result[0];
    } catch(error) {
        console.log(error);
        throw error;
    }
};

exports.setNewPassword = async (password, token) => {
    try {
        const result = await db.sql`UPDATE users SET password=${password}, reset_password_token=${null} WHERE reset_password_token = ${token} RETURNING *`;
        return result[0];
    } catch(error) {
        console.log(error);
        throw error;
    }
};