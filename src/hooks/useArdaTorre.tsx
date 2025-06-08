import axios from "axios";
import { useCallback } from "react";
import type { HistoryResponse } from "../types/apiResponse.types";

export const useArdaTorre = () => {
  const api = axios.create({
    baseURL: "http://arda.torre.co",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const getByName = useCallback(
    async (name: string): Promise<HistoryResponse[]> => {
      const res = await api.post("/entities/_searchStream", {
        query: `"${name}"`,
        identityType: "person",
        limit: 20,
        meta: true,
        excludeContacts: true,
      });
      if (!res.data) return [];
      if (typeof res.data === "string") {
        const data = res.data
          .trim()
          .split("\n")
          .map((line: string) => JSON.parse(line));
        return data;
      } else {
        return [res.data];
      }
    },
    [api]
  );

  return {
    getByName,
  };
};
