import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async () => {
  const res = await axios.get("/api/users/me", {
    withCredentials: true,
  });
  return res.data;
};

const useAuth = () => {
  return useQuery(["user"], fetchUser, {
    staleTime: Infinity,
    retry: false,
  });
};

export default useAuth;
