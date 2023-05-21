const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tour = new Schema(
    {
        name: {
            type: String,
        },
        duration: {
            type: Number,
        },
        description: {
            type: String,
        },
        schedule: {
            type: Array,
            default: [],
        },
        price: {
            adult: {
                type: Number,
            },
            children: {
                type: Number,
            },
        },
        reviews: {
            type: Array,
        },
        code: {
            type: String,
        },
        destination: {
            type: Object,
        },
        images : {
            type : Array
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Tour", Tour);
