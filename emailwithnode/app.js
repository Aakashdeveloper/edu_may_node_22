var nodemailer = require('nodemailer');
let dotenv = require('dotenv');
dotenv.config()

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahanda205@gmail.com',
    pass: process.env.PASSWORD
  }
});

var mailOptions = {
  from: 'ahanda205@gmail.com',
  to: 'ahanda206@hotmail.com',
  subject: 'Edu May Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});