
exports.post = async (user) => {
    console.log(user);
    console.log('SignUp Model');
    try {
        const result = await sql`SELECT * FROM users`;
        //sql`INSERT INTO users (username, password, email) VALUES (${user.username}, ${user.password}, ${user.email}) returning *`;
        return result;
    } catch(error) {
        console.log(error);
        // return message, example: if user creates account with existing email
    } 
}