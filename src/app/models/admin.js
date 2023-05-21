const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const admin = new schema(
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
        role : {
            type : Number ,
            require : true
        }
    },
    {
        timestamps: true,
    }
);
