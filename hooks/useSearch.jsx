import axios from "axios";
import { useState } from "react";

export const useSearch = (setResults) => {
  const [search, setSearch] = useState({ name: "" });
  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearch({ name: value });
  };
  const handleSubmit = async (event, setLoading) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get("/api/playlist", { params: search });
      if (data) {
        setResults(data.data);
      }
    } catch (e) {}
    setLoading(false);
  };
  return { handleChange, handleSubmit };
};
