import axios from "axios";
import { useState } from "react";

export const useRegister = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const setCookie = (name, value) => {
    const cookie = `${name}=${value}; Path=/; Max-Age=120; SameSite=Lax`;
    document.cookie = cookie;
  };
  const handleSubmit = async (event, setStat) => {
    event.preventDefault();
    setStat("loading");
    if (values.password.length > 20 || values.password.length < 6) {
      setStat("error");
      return;
    }
    if (values.email.length < 7 || values.email.length > 50) {
      setStat("error");
      return;
    }

    try {
      await axios.post("/api/auth/register", {
        ...values,
      });
      setCookie("email", values.email);
      setStat("success");
    } catch (e) {
      setStat("error");
    }
  };

  return { handleChange, handleSubmit };
};
