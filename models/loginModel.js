const db = require('../pgConnect');

exports.checkEmail = async (email, password) => {
    try {
        const EmailExists = await db.sql`SELECT * FROM users WHERE email = ${email} RETURNING id, password`;
        if(EmailExists.length===0){
            return Error('No account with this email exists!');
        } else {
            return EmailExists[0];
        }
    } catch(error) {
        console.log(error);
    }
};

exports.checkUsername = async (username, password) => {
    try {
        const UserNameExists = await db.sql`SELECT * FROM users WHERE username = ${username} RETURNING id, password`;
        if(UserNameExists.length===0){
            return Error('No account with this username exists!');
        } else {
            return UserNameExists[0];
        }
    } catch(error) {
        console.log(error);
    }
};