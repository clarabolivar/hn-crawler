const fs = require("fs");
const path = require("path");

const DEFAULT_LOG_PATH = path.join(__dirname, "..", "usage.json");

/**
 * Save a usage event with the required fields.
 *
 * @param {{ filter: string }} data
 * @param {string} [filePath]
 * @returns {{ ts: string, filter: string }}
 */
function logUsage({ filter }, filePath = DEFAULT_LOG_PATH) {
  const event = {
    ts: new Date().toISOString(),
    filter,
  };

  try {
    const exists = fs.existsSync(filePath);
    const prev = exists ? JSON.parse(fs.readFileSync(filePath, "utf8")) : [];
    prev.push(event);
    fs.writeFileSync(filePath, JSON.stringify(prev, null, 2));
  } catch {
    // don't crash if logging fails
  }

  return event;
}

module.exports = { logUsage, DEFAULT_LOG_PATH };
