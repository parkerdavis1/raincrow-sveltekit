import { _ } from '$lib/services/i18n';
import { get } from 'svelte/store';
import { dataRange } from '$lib/services/helpers';

function convertDegreesToDirection(deg) {
	if ((deg >= 0 && deg < 22.5) || (deg >= 337.5 && deg <= 360)) {
		return get(_)('weather.direction.north');
	} else if (deg >= 22.5 && deg < 67.5) {
		return get(_)('weather.direction.north_east');
	} else if (deg >= 67.5 && deg < 112.5) {
		return get(_)('weather.direction.east');
	} else if (deg >= 112.5 && deg < 157.5) {
		return get(_)('weather.direction.south_east');
	} else if (deg >= 157.5 && deg < 202.5) {
		return get(_)('weather.direction.south');
	} else if (deg >= 202.5 && deg < 247.5) {
		return get(_)('weather.direction.south_west');
	} else if (deg >= 247.5 && deg < 292.5) {
		return get(_)('weather.direction.west');
	} else if (deg >= 292.5 && deg < 337.5) {
		return get(_)('weather.direction.north_west');
	}
}

function convertDegreesToArrow(deg) {
	if ((deg >= 0 && deg < 22.5) || (deg >= 337.5 && deg <= 360)) {
		return '↑';
	} else if (deg >= 22.5 && deg < 67.5) {
		return '↗';
	} else if (deg >= 67.5 && deg < 112.5) {
		return '→';
	} else if (deg >= 112.5 && deg < 157.5) {
		return '↘';
	} else if (deg >= 157.5 && deg < 202.5) {
		return '↓';
	} else if (deg >= 202.5 && deg < 247.5) {
		return '↙';
	} else if (deg >= 247.5 && deg < 292.5) {
		return '←';
	} else if (deg >= 292.5 && deg < 337.5) {
		return '↖';
	}
}

export function parseWindDirection(weatherResults) {
	let parsedWindDirection = {
		text: dataRange(
			convertDegreesToDirection(weatherResults.start.data[0].wind_deg),
			convertDegreesToDirection(weatherResults.end.data[0].wind_deg)
		),
		arrow: dataRange(
			convertDegreesToArrow(weatherResults.start.data[0].wind_deg),
			convertDegreesToArrow(weatherResults.end.data[0].wind_deg)
		)
	};

	return parsedWindDirection;
}
