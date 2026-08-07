require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const config = require('./config');

const app = express();
const KEY = process.env.WMATA_KEY;

const cachce = {};

async function fetchMetroData(path) {
	const res = await fetch(`https://api.wmata.com${path}`,{
		headers: {
			'api_key': KEY
		}
	});
	if (!res.ok) throw new Error(`WMATA ${res.status}`);
	return res.json();
}

async function updateRail() {
	try {
		const codes = config.station.codes.join(',');
		const data = await fetchWMATA(`/StationPrediction.svc/json/GetPrediction/${codes}`);
		cache.rail = { data: data.Trains,updated: Date.now(),error: null };
	} catch (e) {
		cache.rail.error = e.message;
		console.error('rail:',e.message);
	}
}

async function updateBus() {
	const results = [];
	for (const route of config.bus.routes) {
		for (const dir of route.directions) {
			try {
				const data = await fetchWMATA(
					`/NextBusService.svc/json/jPredictions?StopID=${dir.stopId}`
				);
				results.push({
					route: route.route,
					direction: dir.label,
					predictions: (data.Predictions || [])
						.filter(p => p.RouteID === route.route)
				});
			} catch (e) {
				results.push({
					route: route.route,
					direction: dir.label,
					error: e.message,
					predictions: []
				});
			}
		}
	}
	cache.bus = { data: results,updated: Date.now() };
}


// Poll API endpoints on a schedule.
updateRail(); setInterval(updateRail,20_000);
updateBus(); setInterval(updateBus,30_000);
updateRailAlerts(); setInterval(updateRailAlerts,60_000);
updateBusAlerts(); setInterval(updateBusAlerts,60_000);
updateWeather(); setInterval(updateWeather,600_000);

app.get('/api/arrivals',(req,res) => {
	res.json({
		rail: cache.rail,
		bus: cache.bus,
		alerts: {
			rail: (cache.railAlerts.data || [])
				.filter(i => config.station.lines.some(l =>
					(i.LinesAffected || '').includes(l))),
			bus: (cache.busAlerts.data || [])
				.filter(i => config.bus.routes.length === 0 ||
					config.bus.routes.some(r => (i.RoutesAffected || []).includes(r)))
		},
		weather: cache.weather,
		serverTime: Date.now()
	});
});

app.use(express.static('public'));
app.listen(3000,() => console.log('http://localhost:3000'));