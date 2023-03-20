const youtubedl = require("youtube-dl-exec");
const { StatusCodes } = require("http-status-codes");
import { BadRequestError } from "../errors";

const getMusic = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    throw BadRequestError(res, err.message);
  }
  var musicInfo = {
    title: "",
    thumbnail: "",
    duration: "",
    url: "",
    channel: "",
  };
  youtubedl(url, {
    dumpSingleJson: true,
    noCheckCertificates: true,
    noWarnings: true,
    preferFreeFormats: true,
    x: true,
    addHeader: ["referer:youtube.com", "user-agent:googlebot"],
  }).then((data) => {
    musicInfo.url = data.fragments[0].url;
    musicInfo.thumbnail = data.thumbnail;
    musicInfo.title = data.title;
    musicInfo.duration = data.duration;
    musicInfo.channel = data.uploader;
    res.status(StatusCodes.OK).json({ musicInfo });
  });
};
module.exports = { getMusic };
