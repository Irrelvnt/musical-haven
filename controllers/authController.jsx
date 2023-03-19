import { BadRequestError, UnauthenticatedError } from "../errors";
import Token from "../Models/Token";
import User from "../Models/User";
const { StatusCodes } = require("http-status-codes");

const { attachCookiesToResponse, createTokenUser } = require("../utils");
const crypto = require("crypto");

const register = async (req, res) => {
  const { email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw BadRequestError(res, "Email already exists");
  }

  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    email,
    password,
    verificationToken,
  });

  return res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw BadRequestError(res, "Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw UnauthenticatedError(res, "Invalid Credentials");
  }
  const isPasswordCorrect = password === user.password;

  if (!isPasswordCorrect) {
    throw UnauthenticatedError(res, "Invalid Credentials");
  }

  const tokenUser = createTokenUser(user);
  // create refresh token
  let refreshToken = "";
  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw UnauthenticatedError(res, "Invalid Credentials");
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

module.exports = {
  login,
  register,
};
