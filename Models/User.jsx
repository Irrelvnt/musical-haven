import { Schema, models, model } from "mongoose";
import { isEmail } from "validator";
import { genSalt, hash, compare } from "bcryptjs";
const SongSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Name is required"],
      minlength: 2,
      maxlength: 50,
    },
    artist: {
      type: String,
      required: [true, "Artist is required"],
      minlength: 2,
      maxlength: 50,
    },
    cover: {
      type: String,
      required: [true, "Thumbnail is required"],
      minlength: 2,
      maxlength: 400,
    },
    time: {
      type: Number,
    },
    url: {
      type: String,
      required: [true, "Url is required"],
      minlength: 2,
      maxlength: 400,
    },
  },
  {
    timestamps: true,
  }
);
const UserSchema = new Schema(
  {
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
    favourites: {
      type: [SongSchema],
      required: false,
      default: [],
    },
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
