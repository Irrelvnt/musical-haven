import connectDb from "../../../config/db";

const User = require("../../../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../../errors");

const { sendResetPasswordEmail, createHash } = require("../../../utils");
const crypto = require("crypto");

const forgotPassword = async (req, res) => {
  await connectDb(process.env.MONGODB_URL);

  const { method } = req;

  if (method !== "POST") {
    return res
      .status(400)
      .json({ success: false, message: "Only POST requests are allowed." });
  }

  const { email } = req.body;
  if (!email) {
    CustomError.BadRequestError(res, "Please provide valid email");
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    // send email

    const origin = "https://bewell-seven.vercel.app/auth";
    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password link" });
};

export default forgotPassword;
