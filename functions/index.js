/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.getByUserName = onRequest(async (request, response) => {
  logger.info("Hello logs!", { structuredData: true });

  const userName = request.query.username; // ✅ corregido aquí
  logger.info("Extracted username", userName);

  if (!userName) {
    response.status(400).send("Missing 'username' query parameter");
    return;
  }

  try {
    const res = await fetch(`https://torre.ai/api/genome/bios/${userName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      logger.error("Failed to fetch from Torre API", { status: res.status });
      response.status(res.status).send("Error fetching genome");
      return;
    }

    const data = await res.json(); // ✅ fetch necesita .json()
    logger.info("Genome fetched", { user: data.person?.publicId });

    response.status(200).json(data);
  } catch (err) {
    logger.error("Exception while fetching genome", { err });
    response.status(500).send("Internal Server Error");
  }
});
// import axios from "axios";
// import { useCallback } from "react";
// import type { Genome } from "../types/skillGap.types";

// export const useTorreAi = () => {
//   const api = axios.create({
//     baseURL: "https://torre.ai",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const getByUserName = useCallback(
//     async (userName: string) => {
//       const res = await api.get(`/api/genome/bios/${userName}`);
//       console.log({ data: res.data });
//       return res.data as Genome;
//     },
//     [api]
//   );
//   return {
//     getByUserName,
//   };
// };
