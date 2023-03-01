import { Schema, models, model } from "mongoose";
import { isEmail } from "validator";
import { genSalt, hash, compare } from "bcryptjs";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 2,
      maxlength: 50,
    },
    surname: {
      type: String,
      required: [true, "surname is required"],
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: isEmail,
        message: "{VALUE} is not a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    preferences: {
      type: Array,
      required: [true, "preferences required"],
    },
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
    passwordToken: String,
    passwordTokenExpirationDate: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await genSalt(10);
  this.password = hash(this.password, salt);
});

UserSchema.methods.comparePassword = function (password) {
  return compare(password, this.password);
};

export default models.User || model("User", UserSchema);
