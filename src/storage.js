const fs = require("fs");
const path = require("path");

const DEFAULT_LOG_PATH = path.join(__dirname, "..", "usage.json");

/**
 * Write a usage event to a JSON file.
 *
 * Always saves:
 *   - ts: timestamp (ISO string)
 *   - filter: applied filter
 *
 * If provided:
 *   - endpoint
 *   - durationMs
 *   - resultCount
 *   - userAgent
 *
 * @param {Object} data 
 * @param {string} data.filter
 * @param {string} [data.endpoint]
 * @param {number} [data.durationMs]
 * @param {number} [data.count]
 * @param {string} [data.ua]
 * @param {string} [filePath]
 * @returns {Object} event
 */

function logUsage({ endpoint, filter = "none", durationMs = null, count = null, ua = "" }, filePath = DEFAULT_LOG_PATH) {
  const event = {
    ts: new Date().toISOString(),
    endpoint,
    filter,
    durationMs,
    resultCount: count,
    userAgent: ua,
  };

  try {
    const exists = fs.existsSync(filePath);
    const prev = exists ? JSON.parse(fs.readFileSync(filePath, "utf8")) : [];
    prev.push(event);
    fs.writeFileSync(filePath, JSON.stringify(prev, null, 2));
  } catch {
    // ignore logging errors
  }

  return event;
}

module.exports = { logUsage, DEFAULT_LOG_PATH };
