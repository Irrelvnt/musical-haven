const { StatusCodes } = require("http-status-codes");
import { BadRequestError, UnauthenticatedError } from "../errors";
import Playlist from "../Models/Playlist";
import User from "../Models/User";

async function getMusicVideoUrl(videoName) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    videoName
  )}&key=${apiKey}`;

  const response = await fetch(searchUrl);
  const result = await response.json();

  if (result.items.length > 0) {
    const videoId = result.items[0].id.videoId;
    return `https://www.youtube.com/watch?v=${videoId}`;
  } else {
    throw new Error(`No video found with name "${videoName}"`);
  }
}
async function getMusicVideoDetails(videoName) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
    videoName
  )}&key=${apiKey}`;

  const response = await fetch(searchUrl);
  const result = await response.json();
  if (result?.items.length > 0) {
    return result.items;
    //   const video = result.items[0];
    //   return {
    //     url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
    //     duration: video.contentDetails.duration,
    //     thumbnail: video.snippet.thumbnails.medium.url,
    //     title: video.snippet.title,
    //   };
  } else {
    throw new Error(`No video found with name "${videoName}"`);
  }
}

const recommendPlaylist = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    throw BadRequestError(res, "please provide a search value");
  }
  getMusicVideoDetails(name)
    .then((videos) => {
      res.status(StatusCodes.OK).json({ videos });
    })
    .catch((err) => {
      throw BadRequestError(res, err.message);
    });
};

const getPlaylists = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    throw BadRequestError(res, "please provide a search value");
  }
  const data = await Playlist.find({
    name: { $regex: name, $options: "i" },
  });
  res.status(StatusCodes.OK).json({ data });
};

const updateFavourites = async (req, res) => {
  const { songs, _id } = req.body;
  if (!songs)
    throw BadRequestError(res, "please provide songs to add to favourites");
  if (!_id) {
    throw UnauthenticatedError(res, "please log in");
  }
  const user = await User.findOne({ _id });
  const favourites = user.favourites;
  for (let song of songs) {
    if (!favourites.includes(song)) {
      favourites.push(song);
    }
  }
  await user.updateOne(
    { _id },
    { favourites },
    { new: true, runValidators: true }
  );
  await user.save();
  res.status(StatusCodes.OK).json({ message: "favourites playlist updated" });
};

const getFavourites = async (req, res) => {
  const { _id } = req.user;
  const data = await User.find({ _id });
  res.status(StatusCodes.OK).json({ favourites: data.favourites });
};

const getPlaylist = async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw BadRequestError(res, "please provide a playlist id");
  const playlist = await Playlist.findOne({ _id });
  console.log(playlist);
  res.status(StatusCodes.OK).json({ playlist });
};

const createPlaylist = async (req, res) => {
  const { songs, name } = req.body;
  const _id = req.user.userId;
  const playlist = await Playlist.create({
    name,
    songs,
    creator: _id,
  });
  res.status(StatusCodes.CREATED).json({ playlist });
};

module.exports = {
  recommendPlaylist,
  createPlaylist,
  getPlaylists,
  getFavourites,
  updateFavourites,
  getPlaylist,
};
