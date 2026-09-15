const pool = require("../config/database");

const getAllBooks = async () => {
    const result = await pool.query(
        "SELECT * FROM books ORDER BY id ASC"
    );

    return result.rows;
};

module.exports = {
    getAllBooks
};