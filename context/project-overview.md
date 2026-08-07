# next-arriving-metro

## Project Overview

A small app that shows the next arriving WMATA rail and bus predictions for a configured
station/stop. The backend fetches live data from the WMATA developer API and exposes a
single endpoint; the frontend polls it and renders arrivals, alerts, and weather.

## Architecture

1. **Backend**: Node.js + Express. Reads `.env` for the WMATA API key. Polls WMATA
   endpoints on a schedule and caches the latest response in memory.
2. **Frontend**: Static HTML/CSS/JS in `public/`. Polls `/api/arrivals` and renders the
   result.
3. **No persistent database** — all data is live from WMATA.

## WMATA API

- Rail predictions: `https://api.wmata.com/StationPrediction.svc/json/GetPrediction/{codes}`
- Bus predictions: `https://api.wmata.com/NextBusService.svc/json/jPredictions?StopID={stopId}`
- Alerts and weather endpoints are planned but not implemented yet.

## Current State

The repo contains an early Express server (`server.js`) and a starter frontend
(`public/index.html`, `public/app.js`, `public/styles.css`). Several backend pieces are
still stubs or unimplemented:

- `fetchWMATA` is referenced but not defined; `fetchMetroData` exists instead.
- `cache` is misspelled as `cachce` in one place.
- `updateRailAlerts`, `updateBusAlerts`, and `updateWeather` are called but not defined.
- `config.station.lines` is referenced for alert filtering but not defined in `config.js`.
- Bus routes in `config.js` are placeholders (`TBD`).

These are known issues that will be addressed by future features, not something to fix
opportunistically.

## Tech Stack

- Node.js
- Express
- `node-fetch` v2
- `dotenv`
- Vanilla HTML/CSS/JS frontend

## Risks & Watch Items

- WMATA API rate limits and key hygiene.
- The API key must stay in `.env` and never be committed.
- No tests or linting are set up yet.
