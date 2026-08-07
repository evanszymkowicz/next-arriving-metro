// config.js
module.exports = {
	station: {
		codes: ['E04'],	// Transfer stations will use two (e.g. ['A01', 'C01']).
		name: 'Columbia Heights',
		directions: {
			'1': 'Toward Branch Ave/Huntington',
			'2': 'Toward Greenbelt/Mt Vernon Sq'
		}
	},
	bus: {
		routes: [
			{
				route: 'TBD',	// e.g. '52'
				directions: [
					{ label: 'Northbound',stopId: 'TBD' },
					{ label: 'Southbound',stopId: 'TBD' }
				]
			},
			{
				route: 'TBD',
				directions: [
					{ label: 'Northbound',stopId: 'TBD' },
					{ label: 'Southbound',stopId: 'TBD' }
				]
			}
		]
	},
	location: { lat: 38.9285,lon: -77.0322 }  // Columbia Heights Metro
};