const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
  host: 'smtp.gmail.com',
  service: 'gmail',
});

const mailer = async ({
  subject, html, to, text,
}) => {
  const info = await transporter.sendMail({
    subject, html, to, text,
  });
  console.log('Message sent: ', info);
};

module.exports = mailer;
