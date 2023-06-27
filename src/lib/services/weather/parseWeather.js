import { get } from 'svelte/store';
import { _ } from '$lib/services/i18n';
import { parseIcon } from './parse/icon';
import { parseConditions } from './parse/conditions';
import { parseTemperature } from './parse/temperature';
import { parseWindspeed } from './parse/windspeed';
import { parseWindDirection } from './parse/windDirection';
import { parseCloudCover } from './parse/cloudCover';
import { parseHumidity } from './parse/humidity';
import { parsePressure } from './parse/pressure';
import { parseSunrise, parseSunset } from './parse/sunriseSunset';

export function parseWeather({ weatherResults, timeZoneOffset }) {
	let parsedWeather = {
		icon: {
			open: null,
			emoji: null
		},
		conditions: null,
		temperature: {
			f: null,
			c: null
		},
		windspeed: {
			mph: null,
			kmh: null,
			ms: null,
			beaufort: null,
			description: null
		},
		windDirection: {
			text: null,
			arrow: null
		},
		cloudCover: null,
		humidity: null,
		pressure: null,
		sunrise: null,
		sunset: null,
		attr: get(_)('weather.generated_by')
	};

	// Icon
	parsedWeather.icon = parseIcon(weatherResults);
	// CONDITION
	parsedWeather.conditions = parseConditions(weatherResults);
	// TEMPERATURE
	parsedWeather.temperature = parseTemperature(weatherResults);
	// WINDSPEED
	parsedWeather.windspeed = parseWindspeed(weatherResults);
	// WIND DIRECTION
	parsedWeather.windDirection = parseWindDirection(weatherResults);
	// CLOUD COVER
	parsedWeather.cloudCover = parseCloudCover(weatherResults);
	// HUMIDITY
	parsedWeather.humidity = parseHumidity(weatherResults);
	// PRESSURE
	parsedWeather.pressure = parsePressure(weatherResults);
	// SUNRISE
	parsedWeather.sunrise = parseSunrise(weatherResults, timeZoneOffset);
	// SUNSET
	parsedWeather.sunset = parseSunset(weatherResults, timeZoneOffset);

	return parsedWeather;
}
