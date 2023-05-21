const User = require("../models/User");
const bcrypt = require("bcryptjs");

class UserController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({
                username,
            });
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    let userInfo = {
                        ...user,
                    };
                    req.session.user = userInfo;
                    console.log("LOGIN :" ,req.session);
                    res.json({
                        code: 200,
                        msg: "Login Success !!",
                        user: {
                            ...user._doc,
                        },
                    });
                } else {
                    res.status(400).json({
                        code: 400,
                        msg:
                            "Username or Password is incorrect , Please try again!!",
                    });
                }
            } else {
                res.status(400).json({
                    code: 400,
                    msg:
                        "Username or Password is incorrect , Please try again!!",
                });
            }
        } catch (err) {
            res.json({ err }).status(500);
        }
    }
    async register(req, res) {
        try {
            const user = new User(req.body);
            await user.save();
            res.json({
                code: 200,
                msg: "Đăng ký thành công!!!",
            });
        } catch (err) {
            res.json({ err }).status(500);
        }
    }
    updateProfile(req, res) {
        User.updateOne(
            {
                id: req.body.id,
            },
            { ...req.body }
        )
            .then(() => {
                res.status(200).json({
                    code: 200,
                    message: "Cập nhật profile thành công !!",
                });
            })
            .catch((err) => {
                res.status(401).json({
                    code: 0,
                    message: "Cập nhật thất bại !!",
                    err: err,
                });
            });
    }

    getProfile(req, res) {
        console.log(req.session);
        User.findOne({
            _id : req.params.id
        })
        .then((user) => {
            res.status(200).json({
                code: 200,
                user,
            });
        })
        .catch(err => {
            res.status(401).json({
                code : 0 ,
                err
            })
        })
    }
}

module.exports = new UserController();
