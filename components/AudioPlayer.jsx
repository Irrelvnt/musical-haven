import axios from "axios";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { usePlaylist } from "../store/playlist";

export default function Player() {
  const playlist = usePlaylist((state) => state.playlist);
  const currentSong = usePlaylist((state) => state.currentSong);
  const [playing, setPlaying] = useState(null);
  useEffect(() => {
    const getPlaybackurl = async (url) => {
      await axios
        .post("/api/music", { url: url })
        .then((res) => {
          setPlaying(res.data.musicInfo.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (currentSong) {
      getPlaybackurl(currentSong);
    }
  }, [playlist, currentSong]);

  return (
    <AudioPlayer
      src={playing}
      showSkipControls={false}
      showDownloadProgress
      showFilledProgress
      layout="stacked"
    />
  );
}
