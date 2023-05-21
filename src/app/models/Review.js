const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Review = new Schema(
    {
        user : Object ,
        tourId : String,
        rating : Number,
        comment : String,
        date : Date
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Review", Review);
