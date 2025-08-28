const express = require("express");
const { fetchTop30 } = require("./crawler");
const { filterMoreThanFiveWords, filterFiveOrLessWords } = require("./filters");
const { logUsage } = require("./storage");

const app = express();

app.get("/api/crawl", async (req, res) => {
  try {
    const entries = await fetchTop30();
    res.json({ entries });
  } catch (e) {
    res.status(500).json({ error: "crawl failed" });
  }
});


module.exports = app; 
