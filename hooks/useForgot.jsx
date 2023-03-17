import axios from "axios";
import { useState } from "react";

export const useForgot = () => {
  const [mail, setMail] = useState({ email: "" });
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setMail({ ...mail, [name]: value });
  };
  const handleSubmit = async (event, setSent) => {
    event.preventDefault();
    setSent(true);
    try {
      await axios.post("/api/auth/forgot-password", mail);
    } catch (e) {}
  };
  return { handleChange, handleSubmit };
};
