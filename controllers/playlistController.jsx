const { StatusCodes } = require("http-status-codes");
const { Builder, By, until } = require("selenium-webdriver");
import Playlist from "../models/Playlist";

async function get_song_url(driver, song_title) {
  let query = song_title.replace(" ", "+");
  let url = `https://www.youtube.com/results?search_query=${query}`;
  await driver.get(url);
  let match = await driver.wait(
    until.elementLocated(By.css("ytd-video-renderer")),
    15000
  );
  return await match.findElement(By.id("video-title")).getAttribute("href");
}

function sleep(s) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * s));
}

async function is_song(song) {
  const keywords = [
    "song",
    "music",
    "lyrics",
    "lyric",
    "audio",
    "mix",
    "remix",
    " - ",
    "original",
    "version",
    "cover",
    "official",
  ];
  const to_avoid = ["live", "performance", "billboard", "review", "reaction"];

  const duration = await song.findElement(By.id("text")).getText();

  if (duration) {
    try {
      let Duration = duration.split(":");
      let realDuration = parseInt(Duration[Duration.length - 2]);
      console.log(realDuration);
      if (realDuration > 5) {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  const title = await song.findElement(By.id("video-title")).getText();
  for (let keyword of to_avoid) {
    if (title.toLowerCase().includes(keyword)) {
      return false;
    }
  }
  for (let keyword of keywords) {
    if (title.toLowerCase().includes(keyword)) {
      return true;
    }
  }
  return false;
}

async function get_recommendations(driver, url, number) {
  let urls = new Set([url]);
  await driver.get(url);
  await sleep(3);
  for (let i = 0; i < 5; i++) {
    await driver.executeScript("window.scrollBy(0, 2080)");
    await sleep(1);
  }
  let songs = (
    await driver.findElements(By.css("ytd-compact-video-renderer"))
  ).slice(0, number);
  for (let song of songs) {
    let isSong = await is_song(song);
    if (isSong) {
      let url = await song.findElement(By.css("a")).getAttribute("href");
      if (!urls.has(url)) {
        urls.add(url);
      }
    }
  }
  return urls;
}

const recommendPlaylist = async (req, res) => {
  const { name } = req.query;
  let number = 50;
  let driver = await new Builder().forBrowser("chrome").build();
  let url = await get_song_url(driver, name);
  let recommendations = await get_recommendations(driver, url, number);
  while (1 < recommendations.size && recommendations.size < number) {
    recommendations = new Set([
      ...recommendations,
      ...(await get_recommendations(
        driver,
        [...recommendations].pop(),
        number
      )),
    ]);
  }
  await driver.quit();
  res.status(StatusCodes.OK).json({ recommendations: [...recommendations] });
};

const createPlaylist = async (req, res) => {
  const { songs, name } = req.body;
  // const { _id } = req.user;
  const playlist = await Playlist.create({
    name,
    songs,
    // creator: _id,
  });
  res.status(StatusCodes.CREATED).json({ playlist });
};

module.exports = { recommendPlaylist, createPlaylist };
