import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export const useLogin = () => {
  const router = useRouter();
  const [login, setLogin] = useState({ email: "", password: "" });
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };
  const handleSubmit = async (event, setError, setLoading) => {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/auth/login", login);
      setError(false);
      router.push("/me");
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };
  return { handleChange, handleSubmit };
};
