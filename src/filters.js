const { countWords } = require("./utils");

/**
 * Returns entries whose title has more than five words,
 * ordered by number of comments descending (ties by points, then number).
 * @param {Array<{number:number,title:string,points:number,comments:number}>} entries
 * @returns {Array}
 */
function filterMoreThanFiveWords(entries = []) {
  // copy array so we don't mutate the original
  const copy = entries.slice();

  // > 5 words
  const filtered = copy.filter(entry => {
    const words = countWords(entry.title);
    return words > 5;
  });

  // sort by comments desc, then points desc, then number asc
  filtered.sort((a, b) => {
    if (b.comments !== a.comments) {
      return b.comments - a.comments;
    }
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return a.number - b.number;
  });

  return filtered;
}


/**
 * Returns entries whose title has five or fewer words,
 * ordered by points descending (ties by comments, then number).
 * @param {Array<{number:number,title:string,points:number,comments:number}>} entries
 * @returns {Array}
 */
function filterFiveOrLessWords(entries = []) {
  // copy array so we don't mutate the original
  const copy = entries.slice();
  
  // <= 5 words
  const filtered = copy.filter(entry => {
    const words = countWords(entry.title);
    return words <= 5;
  });

  // sort by points desc, then comments desc, then number asc

  filtered.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    if (b.comments !== a.comments) {
      return b.comments - a.comments;
    }
    return a.number - b.number;
  });

  return filtered;
}

module.exports = { filterMoreThanFiveWords, filterFiveOrLessWords };
