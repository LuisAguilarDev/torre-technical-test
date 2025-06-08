import axios from "axios";
import { useCallback } from "react";

export const useSearchTorre = () => {
  const api = axios.create({
    baseURL: "https://search.torre.co",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const getByRole = useCallback(
    async (role: string) => {
      await api.post("/people/_search", {
        sort: "relevance",
        filters: {
          professionalHeadline: [role],
        },
      });
    },
    [api]
  );

  return {
    getByRole,
  };
};
