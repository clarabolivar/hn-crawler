jest.mock("axios"); // to avoid real network requests during tests
const axios = require("axios");  //to make HTTP requests

const { fetchTop30 } = require("../src/crawler");

const Example_HTML = `
<table>
  <tr class="athing" id="1"> <!-- 1st entry: with comments and points -->
    <td class="title"><span class="rank">1.</span></td>
    <td class="title"><span class="titleline"><a href="https://example.com/a">First title</a></span></td>
  </tr>
  <tr>
    <td class="subtext"> 
      <span class="score">100 points</span>
      <a href="/user?id=x">user</a>
      <a href="/item?id=1">50 comments</a>
    </td>
  </tr>

  <tr class="athing" id="2"> <!-- 2nd entry: no comments, no points -->
    <td class="title"><span class="rank">2.</span></td>
    <td class="title"><span class="titleline"><a href="https://example.com/b">Second title</a></span></td>
  </tr>
  <tr>
    <td class="subtext">
      <!-- missing score -->
      <a href="/user?id=y">user</a>
      <a href="/item?id=2">discuss</a> <!-- "discuss" == 0 comments -->
    </td>
  </tr>
</table>
`;

describe("crawler", () => {
  test("should get number, title, points and comments from HTML", async () => {
    axios.get.mockResolvedValue({ data: Example_HTML });
    const entries = await fetchTop30();

    expect(entries).toHaveLength(2); //we have 2 entries

    expect(entries[0]).toEqual({
      number: 1,
      title: "First title",
      points: 100,
      comments: 50,
    });

    expect(entries[1]).toEqual({
      number: 2,
      title: "Second title",
      points: 0,     
      comments: 0,   
    });
  });
});
