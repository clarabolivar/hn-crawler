const fs = require("fs");
const os = require("os");
const path = require("path");
const { logUsage } = require("../src/storage");

function tempFile() {
  return path.join(os.tmpdir(), `usage-${Date.now()}-${Math.random()}.json`);
}

describe("storage (usage logging)", () => {
  test("writes first event with only required fields", () => {
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

  test("appends a second minimal event", () => {
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

  test("stores optional fields when provided", () => {
    const file = tempFile();

    const ev = logUsage(
      { endpoint: "/api/entries", filter: "greater5", durationMs: 12, count: 7, ua: "jest" },
      file
    );

    // returned event
    expect(ev.filter).toBe("greater5");
    expect(ev.endpoint).toBe("/api/entries");
    expect(ev.durationMs).toBe(12);
    expect(ev.resultCount).toBe(7);
    expect(ev.userAgent).toBe("jest");
    expect(typeof ev.ts).toBe("string");

    // saved file
    const saved = JSON.parse(fs.readFileSync(file, "utf8"));
    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({
      filter: "greater5",
      endpoint: "/api/entries",
      durationMs: 12,
      resultCount: 7,
      userAgent: "jest",
    });
    expect(typeof saved[0].ts).toBe("string");

    fs.unlinkSync(file);
  });
});
