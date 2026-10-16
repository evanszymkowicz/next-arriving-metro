require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const config = require('./config');

const app = express();
const KEY = process.env.WMATA_KEY;

const cache = {};

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
		const data = await fetchMetroData(`/StationPrediction.svc/json/GetPrediction/${codes}`);
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
				const data = await fetchMetroData(
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


// ponytail: stubs — implement when alerts/weather are needed
async function updateRailAlerts() {
	try {
		const data = await fetchMetroData(`/Incidents.svc/json/incidents`);
		cache.railAlerts = { data: data.Incidents || [], updated: Date.now(), error: null };
	} catch (e) {
		cache.railAlerts.error = e.message;
		console.error('railAlerts:', e.message);
	}
}

async function updateBusAlerts() {
	try {
		const data = await fetchMetroData(`/Incidents.svc/json/busincidents`);
		cache.busAlerts = { data: data.BusIncidents || [], updated: Date.now(), error: null };
	} catch (e) {
		cache.busAlerts.error = e.message;
		console.error('busAlerts:', e.message);
	}
}

async function updateWeather() {
	// ponytail: no weather endpoint wired, skip until needed
	cache.weather = { data: null, updated: Date.now(), error: 'not implemented' };
}

// Initialize cache structure
cache.rail = { data: [], updated: Date.now(), error: null };
cache.bus = { data: [], updated: Date.now(), error: null };
cache.railAlerts = { data: [], updated: Date.now(), error: null };
cache.busAlerts = { data: [], updated: Date.now(), error: null };
cache.weather = { data: null, updated: Date.now(), error: null };

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