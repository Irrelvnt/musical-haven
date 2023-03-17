import axios from "axios";
import { useState } from "react";

export const useCreatePlaylist = () => {
  const [playlistInfo, setplaylistInfo] = useState({ name: "", songs: [] });
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setplaylistInfo({ ...playlistInfo, [name]: value });
  };
  const handleSubmit = async (event, setStat) => {
    event.preventDefault();
    setStat("loading");
    try {
      await axios.post("/api/playlist/create-playlist", playlistInfo);
      setStat("success");
    } catch (e) {
      setStat("error");
    }
  };
  return { handleChange, handleSubmit };
};
