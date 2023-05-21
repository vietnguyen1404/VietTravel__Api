const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Destination = new Schema(
    {
        name : String ,
        codeName : String
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Destination", Destination);
