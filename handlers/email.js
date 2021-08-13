const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');
const { text } = require('express');

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

// generar HTML
const generarHTML = (archivo, opciones = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
  return juice(html);
};

exports.enviar = async (opciones) => {
  // send mail with defined transport object
  const html = generarHTML(opciones.archivo, opciones);
  const text = htmlToText.fromString(html);

  let info = await transport.sendMail({
    from: 'UpTask <no-reply@uptask.com>', // sender address
    to: opciones.usuario.email, // list of receivers
    subject: opciones.subject, // Subject line
    text, // plain text body
    html // html body
  });

  // const enviarEmail = util.promisify(transport.sendMail, transport);
  // return enviarEmail.call(transport, transport.sendMail);
  const enviarEmail = info;
  return enviarEmail;
};

