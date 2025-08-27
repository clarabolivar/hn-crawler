const { filterMoreThanFiveWords, filterFiveOrLessWords } = require("../src/filters");

const testData = [
  { number: 1,  title: "Short title",                points: 50,  comments: 10 }, // 2 words
  { number: 2,  title: "This is a reasonably long headline", points: 75,  comments: 30 }, // 6 words
  { number: 3,  title: "Self-explained example indeed",      points: 60,  comments: 25 }, // 3 words (self-explained = 1)
  { number: 4,  title: "Another very long and interesting story", points: 40,  comments: 80 }, // 6 words
  { number: 5,  title: "Edge - case   spaced",        points: 65,  comments: 5 },  // 3 words
];

describe("filters", () => {
  test("should return long titles with >5 words ordered by comments desc", () => {
    const res = filterMoreThanFiveWords (testData);
    expect(res.map(e => e.title)).toEqual([
      "Another very long and interesting story", // comments 80
      "This is a reasonably long headline",      // comments 30
    ]);
  });

  test("should return long titles with <=5 words ordered by points desc", () => {
    const res = filterFiveOrLessWords( testData);
    expect(res.map(e => e.title)).toEqual([
      "Edge - case   spaced",     // points 65
      "Self-explained example indeed", // points 60
      "Short title",              // points 50
    ]);
  });
});


describe("filters – tie handling with same word count", () => {
  test(">5 words: sorts by comments, then points, then rank", () => {
    const data = [
      { number: 3, title: "Very very long title to test", points: 100, comments: 50 }, 
      { number: 2, title: "Very very long title to test", points: 80,  comments: 50 }, 
      { number: 1, title: "Very very long title to test", points: 60,  comments: 70 }, 
    ];
    const res = filterMoreThanFiveWords(data);
    expect(res.map(e => e.number)).toEqual([1, 3, 2]);
  });

  test("≤5 words: sorts by points, then comments, then rank", () => {
    const data = [
      { number: 3, title: "Short title testing...", points: 100, comments: 10 }, 
      { number: 1, title: "Short title testing...", points: 100, comments: 20 },
      { number: 2, title: "Short title testing...", points: 90,  comments: 50 },
    ];
    const res = filterFiveOrLessWords(data);
    expect(res.map(e => e.number)).toEqual([1, 3, 2]);
  });
});
