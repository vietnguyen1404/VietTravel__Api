const Review = require("../models/Review");

class ReviewController {
    getReviews(req, res) {
        Review.find({
            tourId : req.params.id
        }).then((reviews => {
            return res.status(200).json({
                code : 200 ,
                reviews 
            })
        }))
    }
    createReview(req, res) {
        Review.create({
            ...req.body,
        })
            .then(async () => {
                res.status(200).json({
                    code: 200,
                    message: "Thêm mới review thành công !",
                });
            })
            .catch(() => {
                res.json({
                    code: 0,
                    message: "Thêm mới review thất bại",
                });
            });
    }
}

module.exports = new ReviewController();
