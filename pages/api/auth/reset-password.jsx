const User = require("../../../../models/User");
const CustomError = require("../../../../errors");

const { createHash } = require("../../../../utils");

const resetPassword = async (req, res) => {
  const { method } = req;

  if (method !== "POST") {
    return res
      .status(400)
      .json({ success: false, message: "Only POST requests are allowed." });
  }

  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    CustomError.BadRequestError(res, "Please provide all values");
  }
  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
      return res.status(200).json({ msg: "Password changed successfully" });
    }
  }

  CustomError.BadRequestError(res, "Invalid token");
};

export default resetPassword;
