import axios from "axios";
import { useCallback } from "react";
import type { Genome } from "../types/skillGap.types";

export const useTorreAi = () => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_GENOME_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const getByUserName = useCallback(
    async (userName: string) => {
      const res = await api.get(`?username=${userName}`);
      console.log({ data: res.data });
      return res.data as Genome;
    },
    [api]
  );
  return {
    getByUserName,
  };
};
