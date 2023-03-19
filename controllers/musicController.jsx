const youtubedl = require("youtube-dl-exec");
const getMusic = async (url) => {
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
    return musicInfo;
  });
};

module.exports = { getMusic };
