import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors";
import User from "../models/User";
import {
  attachCookiesToResponse,
  checkPermissions,
  createTokenUser,
} from "../utils";

const getSingleUser = async (req, res) => {
  const { email } = req.query;
  const { user } = await User.findOne({ email }).select("-password");
  if (!user) {
    throw new NotFoundError(`No user with email : ${email}`);
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select("-password");
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!(email & name)) {
    throw new CustomError.BadRequestError(res, "Please provide all values");
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name },
    { new: true, runValidators: true }
  );
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError(res, "Please provide both values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError(res, "Invalid Credentials");
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

module.exports = {
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
