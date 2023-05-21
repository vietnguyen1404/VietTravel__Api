const Booking = require("../models/Booking");
const Tour = require("../models/Tour");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    // config mail server
    service: "Gmail",
    auth: {
        user: "ntviet1404@gmail.com",
        pass: "rztsmjgawpgmiquh",
    },
});
class bookingController {
    create(req, res, next) {
        Booking.create({ ...req.body, status: 1 })
            .then(async () => {
                res.status(200).json({
                    code: 200,
                    message: "Đặt tour thành công !",
                });
            })
            .catch(() => {
                res.json({
                    code: 0,
                    message: "Đặt tour thất bại",
                });
            });
    }
    getListBooking(req, res) {
        Booking.find()
            .then((bookings) => {
                res.status(200).json({
                    code: 200,
                    bookings,
                });
            })
            .catch((err) => {
                res.status(401).json({
                    code: 401,
                    err,
                });
            });
    }
    async ChangeStatusBooking(req, res) {
        let booking = await Booking.findOne(
            {
                _id: req.params.id,
            }
        )
        if(req.body.status === 2 && booking.paymentMethod === "banking" && booking.status === 1) {
            const { contactDetail, date, totalPrice } = booking;
            await Tour.findOne({
                _id: booking.tourId,
            })
                .then((tour) => {
                    const mainOptions = {
                          from: "Viet Travel",
                        to: contactDetail.email,
                        subject: "You have made a new booking",
                        text:
                            "You recieved message from " +
                            contactDetail.email,
                        html:
                            "<h2>Dear " +
                            contactDetail.fullName +
                            "</h2>" +
                            "<p>You have made a booking on</p>" +
                            "<h1>" +
                            tour.name +
                            "</h1>" +
                            "<p>Travel Date : " +
                            date +
                            "</p>" +
                            "<h1>Total Price :" +
                            totalPrice +
                            "</h1>" +
                            "<hr>" +
                            "<p>If you wish to do the bank transfer. Please use the information below.</p>" +
                            "<h2>Bank Name : VietinBank</h2>" +
                            "<h2>Account Number : 0123-456-789" +
                            "<h2>Swift Code :" +
                            tour.code +
                            "</h2>" +
                            "<h2>With Message : (Swift Code) - (Full Name)</h2> " +
                            "<h2>Example :" +
                            tour.code +
                            " - Nguyễn Trọng Việt</h2>",
                    };
                    transporter.sendMail(mainOptions, function (err) {
                        if (err) {
                            console.log(err);
                        }else {
                            console.log("Gửi mail thành công !!");
                        }
                    });
                })
                .catch((err) => {
                    res.json({
                        message: "Err",
                        err: err,
                        code: 0,
                    });
                });
        }
        booking.status = req.body.status
        await booking.save();
        res.status(200).json({
            code : 200,
            message : 'Change status success !!'
        })
    }
}

module.exports = new bookingController();
