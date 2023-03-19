import axios from "axios";
import { useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { usePlaylist } from "../store/playlist";

export default function Player() {
  const playlist = usePlaylist((state) => state.playlist);
  const currentSong = usePlaylist((state) => state.currentSong);
  const setCurrentSong = usePlaylist((state) => state.setCurrentSong);
  useEffect(() => {
    const getPlaybackurl = async (url) => {
      await axios
        .post("/api/music", { url: url })
        .then((res) => {
          setCurrentSong(res.data.musicInfo.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (currentSong) {
      getPlaybackurl(currentSong);
    }
  }, [playlist]);

  return (
    <AudioPlayer
      src={currentSong}
      showSkipControls={false}
      showDownloadProgress
      showFilledProgress
      layout="stacked"
      onClickNext={() => {
        const index = playlist?.findIndex((song) => song?.url === url);
        if (index === playlist?.length - 1) {
          return;
        }
        setCurrentSong(playlist[index + 1]?.url);
      }}
      onClickPrevious={() => {
        const index = playlist?.findIndex((song) => song?.url === url);
        if (index === 0) {
          return;
        }
        setCurrentSong(playlist[index - 1]?.url);
      }}
    />
  );
}
