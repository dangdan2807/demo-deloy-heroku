const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

class AuthController {
    // [POST] /auth/register
    register = async (req, res) => {
        const { username, password, firstName, lastName } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Tài khoản hoặc mật khẩu không được để trống',
            });
        }
        if (!firstName || !lastName) {
            return res.status(400).json({
                success: false,
                message: 'Họ hoặc tên không được để trống',
            });
        }
        try {
            const user = await userService.getUserByUsername(username);
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'Tài khoản đã tồn tại',
                });
            }

            const userId = await userService.createNewUser({
                firstName,
                lastName,
                username,
                password,
            });

            // return token
            const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET);

            return res.status(200).json({
                success: true,
                message: 'Đăng ký tài khoản thành công',
                accessToken,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi kết nối đến server',
            });
        }
    };

    // [POST] /auth/login
    login = async (req, res, next) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Tài khoản hoặc mật khẩu không được để trống',
            });
        }
        try {
            const user = await userService.getUserByUsername(username);
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Tài khoản hoặc mật khẩu không đúng',
                });
            }
            // username found
            const passwordValid = await argon2.verify(user.password, password);
            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Tài khoản hoặc mật khẩu không đúng',
                });
            }
            if (!user.isActive) {
                return res.status(400).json({
                    success: false,
                    message: 'Tài khoản đã bị vô hiệu hoá hãy liên hệ admin',
                });
            }

            // return token
            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);

            return res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công',
                accessToken,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi kết nối đến server',
            });
        }
    };

    // [GET] /auth/
    checkLoggedIn = async (req, res, next) => {
        try {
            const user = await userService.getUserById(req.userId);
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Người dùng không tồn tại',
                });
            }
            return res.status(200).json({
                success: true,
                message: '',
                user,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi kết nối đến server',
            });
        }
    };
}

module.exports = new AuthController();
