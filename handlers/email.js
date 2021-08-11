const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass, 
    },
});

// let mailOptions = 
// {

//     from: 'UpTask <no-reply@uptask.com>', // sender address
//     to: "correo@correo.com", // list of receivers
//     subject: "Password Reset", // Subject line
//     text: "Hola", // plain text body
//     html: "<b>Hello world?</b>", // html body
// };

// transport.sendEmail(mailOptions);

// send mail with defined transport object
let info = transport.sendMail({
    from: 'UpTask <no-reply@uptask.com>', // sender address
    to: "correo@correo.com", // list of receivers
    subject: "Password Reset", // Subject line
    text: "Hola", // plain text body
    html: "<b>Hello world?</b>", // html body
  });