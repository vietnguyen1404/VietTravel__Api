const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Booking = new Schema(
    {
        contactDetail : Object, 
        paymentMethod : String ,
        participants : Object,
        totalPrice : Number ,
        date : Date,
        tourId : String, 
        status : Number
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Booking", Booking);
