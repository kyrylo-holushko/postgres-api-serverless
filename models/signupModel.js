const db = require('../pgConnect');

exports.post = async (user) => {
    console.log(user);
    console.log('SignUp Model');
    try {
        const UserExists = await db.sql`SELECT * FROM users WHERE email = ${user.email}`;
        if(UserExists.length>0){
            console.log('USEREXISTS: ', UserExists);
            throw 'An account with this email already exists!';
        }
        const result = await db.sql`INSERT INTO users (username, email, password) VALUES (${user.username}, ${user.email}, ${user.password}) RETURNING *`;
        //sql`INSERT INTO users (username, password, email) VALUES (${user.username}, ${user.password}, ${user.email}) returning *`;
        console.log('This is the result of INSERT: ', result[0]);
        return result[0];
    } catch(error) {
        console.log(error);
        return error.message;
        // return message, example: if user creates account with existing email
    }  

    /* const [results, metadata] = await sequelize.query(`SELECT * FROM users`);
    console.log('Here are the results', results);
    console.log('Here is the metadata', metadata);
    return results; */
};