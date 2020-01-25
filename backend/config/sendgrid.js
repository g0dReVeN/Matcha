const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: { api_key: process.env.SENDGRID }
    })
);

module.exports = transporter;