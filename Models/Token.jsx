import { Schema, Types, models, model } from "mongoose";

const TokenSchema = new Schema(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Token || model("Token", TokenSchema);
