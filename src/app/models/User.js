const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
        avatar : {
            type : String
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        },
        fullName: {
            type: String,
            required: true,
        },
        birthDate: {
            type: Date,
        },
        gender: {
            type: String,
        },
        country: {
            type: String,
        },
        phone: {
            type: String,
        },
    },

    {
        timestamps: true,
    }
);
User.pre("save", async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});

module.exports = mongoose.model("User", User);
