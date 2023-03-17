import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function Player({ url }) {
  return (
    <AudioPlayer
      src={url}
      showSkipControls={false}
      showDownloadProgress
      showFilledProgress
      layout="stacked"
    />
  );
}
