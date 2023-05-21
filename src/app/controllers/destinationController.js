const Destination = require("../models/Destination");

class destinationController {
    create(req, res) {
        Destination.create({ ...req.body })
            .then(() => {
                res.status(200).json({
                    code: 200,
                    message: "Thêm mới địa điểm thành công !!",
                });
            })
            .catch((err) => {
                res.status(401).json({
                    code: 0,
                    message: "Thất bại !!",
                    err,
                });
            });
    }
    getListDestination(req, res, next) {
        Destination.find({})
            .then((destinations) => {
                res.status(200).json({
                    code: 200,
                    destinations,
                });
            })
            .catch((err) => {
                res.status(401).json({
                    code: 0,
                    message: "Thất bại !!",
                    err,
                });
            });
    }
    getDestination(req, res) {
        Destination.findOne({
            _id: req.params.id,
        })
            .then((destination) => {
                res.status(200).json({
                    code: 200,
                    destination,
                });
            })
            .catch((err) => {
                res.status(401).json({
                    code: 0,
                    err,
                });
            });
    }
    updateDestination(req, res) {
        Destination.updateOne(
            {
                id: req.body.id,
            },
            { name: req.body.name, codeName: req.body.codeName }
        )
            .then(() => {
                res.status(200).json({
                    code: 200,
                    message: "Cập nhật điểm đến thành công !!",
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
}

module.exports = new destinationController();
