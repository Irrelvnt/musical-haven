const nodemailer = require('nodemailer')

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'Gmail',
    port: 587,
    secure: true,
    auth: {
      user: 'goinhub@gmail.com',
      pass: 'nfweqnvsivgmfeul',
    },
  })
  return transporter.sendMail(
    {
      from: process.env.USER,
      to,
      subject,
      html,
    },
    (error, info) => {
      //console.log("Message sent: %s", info.messageId);
      console.log(error)
      // Preview only available when sending through an Ethereal account
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  )
}

module.exports = sendEmail
