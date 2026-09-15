const { Pool } = require("pg");

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "yarino",
    password: "yarino123",
    database: "yarino"
});

module.exports = pool;