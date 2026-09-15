const express = require("express");

const bookRoutes = require("./routes/book.routes");
const healthRoutes = require("./routes/health.routes");
const userRoutes = require("./routes/user.routes");
const pool = require("./config/database");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/health", healthRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

const PORT = 3000;

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

app.listen(PORT, () => {
    console.log(`Yarino Backend running on http://localhost:${PORT}`);
});