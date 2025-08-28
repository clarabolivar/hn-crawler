# Hacker News Crawler (Coding Exercise)

Coding exercise for Stack Builders.

## Overview

The app does three main things:  
- **Crawls Hacker News**: gets the first 30 entries from [Hacker News](https://news.ycombinator.com/) (number, title, points, comments).  
- **Filters entries**:  
  - `greater5` → only shows titles with **more than 5 words**, sorted by **comments (desc)**, then by points and rank.  
  - `lesseq5` → only shows titles with **5 words or fewer**, sorted by **points (desc)**, then by comments and rank.  
  - `none` (default) → returns all 30 entries without filtering.  
- **Logs usage**: every request to `/api/entries` is stored in a `usage.json` file with:  
  - `ts`: timestamp  
  - `filter`: which filter was used  
  - `endpoint`  

## Tech Stack
- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/) for the API  
- [Jest](https://jestjs.io/) for testing 

## Setup
Install dependencies:
```bash
npm install

## Author
Clara Bolívar Peláez
