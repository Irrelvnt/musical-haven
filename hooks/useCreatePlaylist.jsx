import axios from "axios";
import { useState } from "react";

export const useCreatePlaylist = () => {
  const [playlistInfo, setplaylistInfo] = useState({ name: "" });
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setplaylistInfo({ ...playlistInfo, [name]: value });
  };
  const handleSubmit = async (event, setStat, selected) => {
    event.preventDefault();
    setStat("loading");
    try {
      await axios.post("/api/playlist/create-playlist", {
        ...playlistInfo,
        songs: selected,
      });
      setStat("success");
    } catch (e) {
      setStat("error");
    }
  };
  return { handleChange, handleSubmit };
};
