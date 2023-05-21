const User = require("../models/User");
const authMethod = require("../../util/auth.methods");
const randToken = require("rand-token");
const bcrypt = require("bcryptjs");

class authController {
    async login(req, res) {
        const username = req.body.username.toLowerCase() || "test";
        const password = req.body.password || "12345";

        const user = await User.findOne({ username });
        if (!user) {
            return res
                .status(401)
                .json({ msg: "Tên đăng nhập không tồn tại." });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Mật khẩu không chính xác." });
        }

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        const dataForAccessToken = {
            username: user.username,
        };
        const accessToken = await authMethod.generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife
        );
        if (!accessToken) {
            return res.status(401).json({
                msg: "Đăng nhập không thành công,vui lòng thử lại!!",
            });
        }

        let refreshToken = randToken.generate(16); // tạo 1 refresh token ngẫu nhiên
        if (!user.refreshToken) {
            // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
            await authMethod.updateRefreshToken(user.username, refreshToken);
        } else {
            // Nếu user này đã có refresh token thì lấy refresh token đó từ database
            refreshToken = user.refreshToken;
        }

        return res.status(200).json({
            msg: "Đăng nhập thành công.",
            code: 200,
            accessToken,
            refreshToken,
            user,
        });
    }
    Logout(req, res, next) {
        req.session = null;
        return res.status(200).json({
            message: "Logout",
            code: 200,
        });
    }

    async refreshToken(req, res) {
        // Lấy access token từ header
        const accessTokenFromHeader = req.headers.x_authorization;
        if (!accessTokenFromHeader) {
            return res
                .status(400)
                .json({ msg: "Không tìm thấy access token." });
        }

        // Lấy refresh token từ body
        const refreshTokenFromBody = req.body.refreshToken;
        if (!refreshTokenFromBody) {
            return res
                .status(400)
                .json({ msg: "Không tìm thấy refresh token." });
        }

        const accessTokenSecret =
            process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
        const accessTokenLife =
            process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

        // Decode access token đó
        const decoded = await authMethod.decodeToken(
            accessTokenFromHeader,
            accessTokenSecret
        );
        if (!decoded) {
            return res.status(400).json({ msg: "Access token không hợp lệ." });
        }

        const username = decoded.payload.username; // Lấy username từ payload

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ msg: "User không tồn tại." });
        }

        if (refreshTokenFromBody !== user.refreshToken) {
            return res.status(400).json({ msg: "Refresh token không hợp lệ." });
        }

        // Tạo access token mới
        const dataForAccessToken = {
            username,
        };

        const accessToken = await authMethod.generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife
        );
        if (!accessToken) {
            return res
                .status(400)
                .json({
                    msg: "Tạo access token không thành công, vui lòng thử lại.",
                });
        }
        return res.json({
            accessToken,
        });
    }
}

module.exports = new authController();
