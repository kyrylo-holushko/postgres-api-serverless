const db = require('../pgConnect');

exports.checkEmail = async (email) => {
    try {
        const EmailExists = await db.sql`SELECT uid, password FROM users WHERE email = ${email}`;
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
        const UserNameExists = await db.sql`SELECT uid, password FROM users WHERE username = ${username}`;
        if(UserNameExists.length===0)
            return Error('No account with this username exists!');
        else
            return UserNameExists[0];
    } catch(error) {
        console.log(error);
    }
};