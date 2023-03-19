import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import User from "../Models/User";
import { attachCookiesToResponse, createTokenUser } from "../utils";

const showCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).select("-password");
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { email, name, surname, phone, password } = req.body;
  if (!email || !name || !surname || !phone || !password) {
    throw new BadRequestError("Please fill all fields.");
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user.userId },
    { email, name, surname, phone, password },
    { new: true, runValidators: true }
  );
  await user.save();
  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ req, res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const help = (req, res) => {
  const { sujet, message } = req.body;
  if (!sujet || !message) {
    throw new BadRequestError("Please fill all fields.");
  }

  res.status(StatusCodes.OK).json({
    message: "message envoyé",
  });
};

module.exports = {
  help,
  showCurrentUser,
  updateUser,
};
