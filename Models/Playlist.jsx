import { Schema, models, model } from "mongoose";

const PLaylistSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 2,
      maxlength: 50,
    },
    songs: {
      type: Array,
      required: [true, "Songs are required"],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Playlist || model("Playlist", PLaylistSchema);
