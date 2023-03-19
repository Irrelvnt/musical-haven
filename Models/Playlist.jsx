import { Schema, models, model } from "mongoose";

const SongSchema = new Schema(
  {
    name: {
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
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
      minlength: 2,
      maxlength: 400,
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

const PLaylistSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 2,
      maxlength: 50,
    },
    songs: {
      type: [SongSchema],
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
