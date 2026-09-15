const bookModel = require("../models/book.model");

const getBooks = async (req, res) => {
    try {
        const books = await bookModel.getAllBooks();

        res.status(200).json({
            success: true,
            data: books
        });
    } catch (error) {
        console.error("Error getting books:", error);

        res.status(500).json({
            success: false,
            message: "خطا در دریافت کتاب‌ها"
        });
    }
};

module.exports = {
    getBooks
};