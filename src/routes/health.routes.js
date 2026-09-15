const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Yarino API is healthy"
    });
});

module.exports = router;