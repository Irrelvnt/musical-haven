const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async ({ email, name, token, origin }) => {
  const html = `
    <h1>Hello ${name}</h1>
    <p>Someone (hopefully you) has requested a password reset for your Heroku account. Follow the link below to set a new password:</p>

    <a href="${origin}/reset-password/?token=${token}&email=${email}">

    <p>If you don't wish to reset your password, disregard this email and no action will be taken.</p>
  `;

  return sendEmail({
    from: process.env.USER,
    to: email,
    subject: "Reset Password",
    html,
  });
};

module.exports = sendResetPasswordEmail;
