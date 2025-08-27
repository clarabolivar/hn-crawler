/**
 * Specifications:
 * - Words are separated only by spaces.
 * - Symbols are ignored unless they appear inside a word (e.g. "self-explained").
 * - Returns 0 if the input is empty or contains no valid words.
 *
 * @param {string} title - The text to be processed.
 * @returns {number} The number of words detected in the input.
 */
function countWords(title = "") {
  const parts = String(title).trim().split(/\s+/).filter(Boolean);
  let count = 0;
  for (const part of parts) {
    const cleaned = part.replace(/[^A-Za-z0-9-]+/g, "");
    if (/[A-Za-z0-9]/.test(cleaned)) count += 1;
  }
  return count;
}

module.exports = { countWords };