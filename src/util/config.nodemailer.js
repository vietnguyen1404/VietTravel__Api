const nodemailer = require("nodemailer");
export const transporter = nodemailer.createTransport({
    // config mail server
    service: "Gmail",
    auth: {
        user: "ntviet1404@gmail.com",
        pass: "rztsmjgawpgmiquh",
    },
});