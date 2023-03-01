import CustomError from "../errors";
import Token from "../models/Token";
import User from "../models/User";
const { StatusCodes } = require("http-status-codes");

const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  contactus,
  sendResetPasswordEmail,
  createHash,
} = require("../utils");
const crypto = require("crypto");
const { deleteCookie } = require("cookies-next");
const { default: axios } = require("axios");

const register = async (req, res) => {
  const { email, name, password, surname, phone, informations } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw CustomError.BadRequestError(res, "Email already exists");
  }
  if (!informations) {
    throw CustomError.BadRequestError(res, "Please fill the form");
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    name,
    surname,
    phone,
    email,
    password,
    informations,
    verificationToken,
  });
  const origin = "http://localhost:3000";

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin: origin,
  });

  return res.status(StatusCodes.CREATED).json({ user });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw CustomError.UnauthenticatedError(res, "Verification Failed user");
  }

  if (user.verificationToken !== verificationToken) {
    throw CustomError.UnauthenticatedError(res, "Verification Failed token");
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";

  await user.save();

  return res.status(StatusCodes.OK).json({ msg: "Email Verified" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw CustomError.BadRequestError(res, "Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw CustomError.UnauthenticatedError(res, "Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw CustomError.UnauthenticatedError(res, "Invalid Credentials");
  }
  if (!user.isVerified) {
    throw CustomError.UnauthenticatedError(res, "Please verify your account");
  }
  const tokenUser = createTokenUser(user);
  // create refresh token
  let refreshToken = "";
  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw CustomError.UnauthenticatedError(res, "Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ req, res, user: tokenUser, refreshToken });
    return res.status(StatusCodes.OK).json({ user: tokenUser });
  }
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);
  attachCookiesToResponse({ req, res, user: tokenUser, refreshToken });

  return res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  // const domain = 'localhost:3000'
  const domain = ".goin.ma";

  deleteCookie("accessToken", {
    req,
    res,
    path: "/",
    domain,
  });
  deleteCookie("refreshToken", {
    req,
    res,
    path: "/",
    domain,
  });
  res.status(StatusCodes.OK).json({ msg: "Logged out" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw CustomError.BadRequestError(res, "Please provide valid email");
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    // send email

    const origin = "https://musical-haven.vercel.app/auth";
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
const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw CustomError.BadRequestError(res, "Please provide all values");
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

  throw CustomError.BadRequestError(res, "Invalid token");
};
const contactuscon = async (req, res) => {
  const { email, name, message } = req.body;
  await contactus({
    name: name,
    email: email,
    message: message,
  });
  res.status(StatusCodes.OK).json({ msg: "message sent" });
};

const googleSignin = async (req, res) => {
  const { tokenId } = req.body;
  const response = await axios.post(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`
  );
  const { email_verified, name, email } = response.data;
  if (email_verified) {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: crypto.randomBytes(20).toString("hex"),
        role: "user",
        isVerified: true,
      });
    }
    const tokenUser = createTokenUser(user);
    const refreshToken = crypto.randomBytes(40).toString("hex");
    const userAgent = req.headers["user-agent"];
    const ip = req.ip;
    const userToken = { refreshToken, ip, userAgent, user: user._id };
    await Token.create(userToken);
    attachCookiesToResponse({ req, res, user: tokenUser, refreshToken });

    res.status(StatusCodes.OK).json({ user: tokenUser });
  }
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  contactuscon,
  forgotPassword,
  resetPassword,
  googleSignin,
};
