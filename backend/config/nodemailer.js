// const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");

// const transporter = nodemailer.createTransport(
//     sendgridTransport({
//         auth: { api_key: process.env.SENDGRID }
//     })
// );

// module.exports = transporter;

const nodemailer = require("nodemailer");

const userAccount = process.env.RDU_TOI_GOOGLE_ACCOUNT;
const userAccountPass = process.env.RDU_TOI_GOOGLE_PASS;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: userAccount,
        pass: userAccountPass
    }
});

module.exports = transporter;