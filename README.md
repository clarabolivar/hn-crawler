# Hacker News Crawler (Coding Exercise)

Coding exercise for Stack Builders.

## Overview
The app:
- Gets the first 30 entries from [Hacker News](https://news.ycombinator.com/). - Extracts number, title, points and comments from each entry.
- Provides two filters:
  - Titles with **more than 5** words → ordered by **comments** (desc).
  - Titles with **≤ 5** words → ordered by **points** (desc).
- Counts words by **spaces only** and **exclude any symbols** (e.g. `"This is - a self-explained example"` = 5).

## Tech Stack
- Node.js
- Jest (for unit tests)

## Setup
Install dependencies:
```bash
npm install
