import axios from "axios";
import { useState } from "react";

const useRegister = (setError) => {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
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
  const handleSubmit = async (event, informations, setPage) => {
    event.preventDefault();
    if (values.phone.length !== 10) {
      setError("Gsm invalide");
      return;
    }
    if (values.password.length > 20 || values.password.length < 6) {
      setError("Mot de passe invalide");
      return;
    }
    if (values.email.length < 7 || values.email.length > 50) {
      setError("Email invalide");
      return;
    }
    if (values.surname.length > 20 || values.surname.length < 3) {
      return;
    }
    if (values.name.length > 20 || values.name.length < 3) {
      return;
    }
    setError(false);
    try {
      await axios.post("/api/auth/register", {
        ...values,
        informations,
      });
      setCookie("email", values.email);
      setPage("Payment");
    } catch (e) {}
  };

  return { handleChange, handleSubmit, values };
};

export default useRegister;
