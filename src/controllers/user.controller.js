const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error("Error getting users:", error);

        res.status(500).json({
            success: false,
            message: "خطا در دریافت کاربران"
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "username، email و password الزامی هستند"
            });
        }

        const user = await userModel.createUser(
            username,
            email,
            password
        );

        res.status(201).json({
            success: true,
            message: "کاربر با موفقیت ساخته شد",
            data: user
        });
    } catch (error) {
        console.error("Error creating user:", error);

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "نام کاربری یا ایمیل قبلاً استفاده شده است"
            });
        }

        res.status(500).json({
            success: false,
            message: "خطا در ساخت کاربر"
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "نام کاربری و رمز عبور الزامی است"
            });
        }

        const user = await userModel.getUserByUsername(username);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "نام کاربری یا رمز عبور اشتباه است"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "نام کاربری یا رمز عبور اشتباه است"
            });
        }

        res.status(200).json({
            success: true,
            message: "ورود موفق",
            data: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "خطا در ورود"
        });
    }
};
module.exports = {
    getUsers,
    createUser,
    loginUser
};