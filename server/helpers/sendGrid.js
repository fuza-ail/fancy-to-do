require('dotenv').config()

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

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

// sendEmail('mfuzail1991@gmail.com', 'test', 'testing')