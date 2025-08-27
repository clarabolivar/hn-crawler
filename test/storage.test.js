const fs = require("fs");
const os = require("os");
const path = require("path");
const { logUsage } = require("../src/storage");

function tempFile() {
  return path.join(os.tmpdir(), `usage-${Date.now()}-${Math.random()}.json`);
}

describe("storage (usage logging)", () => {
  test("writes first event (ts + filter) to a new file", () => {
    const file = tempFile();

    const ev = logUsage({ filter: "greater5" }, file);
    expect(ev.filter).toBe("greater5");
    expect(typeof ev.ts).toBe("string");

    const saved = JSON.parse(fs.readFileSync(file, "utf8"));
    expect(saved).toHaveLength(1);
    expect(saved[0].filter).toBe("greater5");
    expect(typeof saved[0].ts).toBe("string");

    fs.unlinkSync(file);
  });

  test("appends a second event", () => {
    const file = tempFile();

    logUsage({ filter: "greater5" }, file);
    logUsage({ filter: "lesseq5" }, file);

    const saved = JSON.parse(fs.readFileSync(file, "utf8"));
    expect(saved).toHaveLength(2);
    expect(saved.map(e => e.filter)).toEqual(["greater5", "lesseq5"]);
    expect(typeof saved[0].ts).toBe("string");
    expect(typeof saved[1].ts).toBe("string");

    fs.unlinkSync(file);
  });
});
