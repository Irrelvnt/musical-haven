const { StatusCodes } = require("http-status-codes");
const youtubedl = require("youtube-dl-exec");

const getVideos = async (req, res) => {
  const { name } = req.body;
  const url = `ytsearch:${name}`;
  const options = {
    dumpSingleJson: true,
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,

    // maxResults: 1,
    // getURL: true,
    // getThumbnail: true,
    // getFilename: true,
    // getFormat: true,
  };
  const videos = await youtubedl(url, options);
  return res.status(StatusCodes.OK).json({ videos });
};

const getVideo = async (req, res) => {
  const { id } = req.params;
  const url = `https://www.youtube.com/watch?v=${id}`;
  const options = {
    dumpSingleJson: true,
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    // maxResults: 1,
    // getURL: true,
    // getThumbnail: true,
    // getFilename: true,
    // getFormat: true,

    // dumpSingleJson: true,
    // noWarnings: true,
    // noCallHome: true,
    // noCheckCertificate: true,
    // preferFreeFormats: true,
    // maxResults: 1,
    // getURL: true,
    // getThumbnail: true,
    // getFilename: true,
    // getFormat: true,
  };
  const video = await youtubedl(url, options);
  return res.status(StatusCodes.OK).json({ video });
};

const getAudio = async (req, res) => {
  const { id } = req.params;
  const url = `https://www.youtube.com/watch?v=${id}`;
  const options = {
    dumpSingleJson: true,
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    // maxResults: 1,
    // getURL: true,
    // getThumbnail: true,
    // getFilename: true,
    // getFormat: true,

    // dumpSingleJson: true,
    // noWarnings: true,
    // noCallHome: true,
    // noCheckCertificate: true,
    // preferFreeFormats: true,
    // maxResults: 1,
    // getURL: true,
    // getThumbnail: true,

    // getFilename: true,
    // getFormat: true,
    // audioFormat: "mp3",
    // audioQuality: 0,
    // output: "%(id)s.%(ext)s",
  };
  const audio = await youtubedl(url, options);
  return res.status(StatusCodes.OK).json({ audio });
};

module.exports = {
  getVideos,
  getVideo,
  getAudio,
};
