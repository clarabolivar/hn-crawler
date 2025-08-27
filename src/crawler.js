const axios = require("axios"); // to make HTTP requests
const cheerio = require("cheerio"); // to read and query the HTML like jQuery

/**
 * Fetches the first 30 entries from Hacker News.
 * Each entry includes:
 *   - number 
 *   - title 
 *   - points (default 0 if missing)
 *   - comments (0 if "discuss")
 *
 * @returns {Promise<Array<{number: number, title: string, points: number, comments: number}>>}
 */
async function fetchTop30() {
  const { data: html } = await axios.get("https://news.ycombinator.com/", {
    timeout: 5000,
  });

  const $ = cheerio.load(html);
  const entries = [];

  $(".athing").each((_, el) => {
    const numberText = $(el).find(".rank").first().text().trim(); // "1."
    const number = parseInt(numberText, 10);

    const title = $(el).find(".titleline a").first().text().trim();

    const sub = $(el).next().find(".subtext");
    const pointsText = sub.find(".score").first().text().trim();   // "123 points"
    const points = pointsText ? parseInt(pointsText, 10) : 0;

    const lastLinkText = sub.find("a").last().text().trim();       // "45 comments" | "discuss"
    const comments = /comment/.test(lastLinkText) ? parseInt(lastLinkText, 10) : 0;

    if (!Number.isNaN(number) && title) {
      entries.push({
        number,
        title,
        points: Number.isNaN(points) ? 0 : points,
        comments: Number.isNaN(comments) ? 0 : comments,
      });
    }
  });

  return entries.sort((a, b) => a.number - b.number).slice(0, 30);
}

module.exports = { fetchTop30 };
