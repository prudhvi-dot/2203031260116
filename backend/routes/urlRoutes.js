import { Router } from "express";
import { isUri } from "valid-url";
import { generate } from "shortid";
import Url from "../models/Url.js";
import { Log } from "../utils/logger.js";

const router = Router();

router.post("/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!isUri(longUrl)) {
      await Log(
        "backend",
        "error",
        "handler",
        "Invalid URL received in request body"
      );
      return res.status(401).json("Invalid URL");
    }

    const shortUrl = generate();
    const url = new Url({ longUrl, shortUrl });
    await url.save();

    await Log(
      "backend",
      "info",
      "handler",
      `Short URL created for: ${longUrl}`
    );

    res.json({ shortUrl: `http://localhost:3000/${shortUrl}` });
  } catch (error) {
    await Log(
      "backend",
      "fatal",
      "handler",
      `Exception in /shorten: ${error.message}`
    );
    res.status(400).json({ error: "Invalid input" });
  }
});

router.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });

    if (url) {
      await Log(
        "backend",
        "info",
        "handler",
        `Redirecting to original URL for short: ${shortUrl}`
      );
      return res.redirect(url.longUrl);
    }

    await Log("backend", "warn", "handler", `Short URL not found: ${shortUrl}`);
    res.status(404).json("URL not found");
  } catch (error) {
    await Log(
      "backend",
      "fatal",
      "handler",
      `Exception in GET /:shortUrl: ${error.message}`
    );
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
