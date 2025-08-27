const { countWords } = require("../src/utils");

describe("countWords", () => {
  test("counts words ignoring symbols (given example)", () => {
    expect(countWords("This is - a self-explained example")).toBe(5);
  });

  test("handles punctuation", () => {
    expect(countWords("Hello, world!")).toBe(2);
  });

  test("handles multiple spaces and empty input", () => {
    expect(countWords("   ")).toBe(0);
    expect(countWords("one    two   three")).toBe(3);
  });

  test("ignores leading/trailing hyphens", () => {
    expect(countWords("--hello-- world")).toBe(2);
  });
});
