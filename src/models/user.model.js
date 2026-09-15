const pool = require("../config/database");
const bcrypt = require("bcrypt");

const getAllUsers = async () => {
    const result = await pool.query(
        "SELECT id, username, email, created_at FROM users ORDER BY id ASC"
    );

    return result.rows;
};

const createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await pool.query(
        `INSERT INTO users (username, email, password)
         VALUES ($1, $2, $3)
         RETURNING id, username, email, created_at`,
        [username, email, hashedPassword]
    );

    return result.rows[0];
};
const getUserByUsername = async (username) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );

    return result.rows[0];
};
module.exports = {
    getAllUsers,
    getUserByUsername
};