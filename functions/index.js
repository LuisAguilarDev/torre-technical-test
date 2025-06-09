const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });

exports.getByUserName = onRequest((request, response) => {
  cors(request, response, async () => {
    logger.info("Hello logs!", { structuredData: true });

    const userName = request.query.username;
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

      const data = await res.json();
      logger.info("Genome fetched", { user: data.person?.publicId });

      response.status(200).json(data);
    } catch (err) {
      logger.error("Exception while fetching genome", { err });
      response.status(500).send("Internal Server Error");
    }
  });
});
