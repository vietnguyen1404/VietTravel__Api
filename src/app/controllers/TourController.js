const { default: ObjectID } = require("bson-objectid");
const Tour = require("../models/Tour");
const Destination = require("../models/Destination");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

class TourController {
    createTour(req, res) {
        console.log(req);
        Tour.create({
            ...req.body,
        })
            .then(async () => {
                res.status(200).json({
                    code: 200,
                    message: "Thêm mới tour thành công !",
                });
            })
            .catch(() => {
                res.json({
                    code: 0,
                    message: "Thêm mới tour thất bại",
                });
            });
    }
    async getTours(req, res, next) {
        if (Object.keys(req.query).length === 0)
            Tour.find({})
                .then((tours) => {
                    res.status(200).json({
                        code: 200,
                        data: tours,
                    });
                })
                .catch((err) =>
                    res.json({
                        err,
                        code: 401,
                    })
                );
        else {
            let query = {};
            const { tourName, destinationId, minPrice, maxPrice } = req.query;
            if (tourName) {
                query.name = {
                    $regex: req.query.tourName,
                };
            }
            if (destinationId) {
                query = {
                    ...query ,
                    "destination._id" : destinationId
                }
            }
            if (minPrice) {
                query = {
                    ...query ,
                    "price.adult" : {
                        $gte: Number.parseInt(req.query.minPrice),
                    }
                }
               
            }
            if (maxPrice) {
                query = {
                    ...query ,
                    "price.adult" : {
                        $lte: Number.parseInt(req.query.maxPrice),
                    }
                }
            }
            console.log(query);
            Tour.find(query)
                .then((tours) => {
                    res.status(200).json({
                        code: 200,
                        data: tours,
                    });
                })
                .catch((err) =>
                    res.json({
                        err,
                        code: 401,
                    })
                );
        }
    }
    getTour(req, res, next) {
        const tour = Tour.findOne({ _id: req.params.id })
            .then((tour) =>
                res.status(200).json({
                    code: 200,
                    tour,
                })
            )
            .catch((err) => res.json(err));
    }
    updateTour(req, res) {
        Tour.updateOne(
            {
                _id: req.body._id,
            },
            { ...req.body }
        )
            .then(() => {
                res.status(200).json({
                    code: 200,
                    message: "Cập nhật tour thành công !!",
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
    deleteTour(req, res) {
        Tour.updateOne(
            {
                _id: req.params.id,
            },
            { deleted: true }
        )
            .then(() => {
                res.status(200).json({
                    code: 200,
                    message: "Xóa tour thành công !!",
                });
            })
            .catch((err) => {
                res.status(401).json({
                    code: 0,
                    message: err,
                });
            });
    }
}

module.exports = new TourController();
