require('dotenv').config()
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SendGridApi);

function sendEmail(email,title,description) {
  const msg = {
    to: email,
    from: email,
    subject: title,
    text: description,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);
}

module.exports = sendEmail