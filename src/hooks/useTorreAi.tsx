import axios from "axios";
import { useCallback } from "react";

export const useTorreAi = () => {
  const api = axios.create({
    baseURL: "https://torre.ai",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const getByUserName = useCallback(
    async (userName: string) => {
      await api.get(`/api/genome/bios/${userName}`);
    },
    [api]
  );
  return {
    getByUserName,
  };
};
