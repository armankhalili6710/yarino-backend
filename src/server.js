const express = require("express");
const cors = require("cors");

const bookRoutes = require("./routes/book.routes");
const healthRoutes = require("./routes/health.routes");
const userRoutes = require("./routes/user.routes");
const pool = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Yarino Backend is running!"
    });
});

app.get("/api/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            status: "ok",
            message: "Database connection is working",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error("Database connection error:", error.message);

        res.status(500).json({
            status: "error",
            message: "Database connection failed"
        });
    }
});

async function initializeDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                author VARCHAR(255),
                description TEXT,
                category VARCHAR(100),
                cover_url TEXT,
                pdf_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("Books table is ready.");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Yarino Backend running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database initialization error:", error.message);
        process.exit(1);
    }
}

initializeDatabase();