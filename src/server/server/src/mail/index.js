/* eslint-disable linebreak-style */
const mailer = require('nodemailer');
// const hbs = require('nodemailer-express-handlebars');

const mailConfig = require('../config/mailer');

const transporter = mailer.createTransport(mailConfig);

// transporter.use('compile', hbs({
//   viewEngine: 'express-handlebars',
//   viewPath: './templates/',
// }));

module.exports = transporter;
