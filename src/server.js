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

app.get("/api/entries", async (req, res) => {
  const filter = String(req.query.filter || "none");
  try {
    const entries = await fetchTop30();
    let result = entries;
    if (filter === "greater5") result = filterMoreThanFiveWords(entries);
    else if (filter === "lesseq5") result = filterFiveOrLessWords(entries);

    logUsage({ endpoint: "/api/entries",filter, count: result.length });
    res.json({ filter, entries: result });
  } catch (e) {
    console.error("filter failed:", e);   
    res.status(500).json({ error: "filter failed" });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

module.exports = app; 
