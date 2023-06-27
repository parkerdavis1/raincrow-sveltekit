import { dataRange } from '$lib/services/helpers';
import { convertToCelsius } from '$lib/services/conversions';

export function parseTemperature(weatherResults) {
	let startTemp = weatherResults.start.data[0].temp;
	let endTemp = weatherResults.end.data[0].temp;

	let parsedTemperature = {
		f: dataRange(Math.round(startTemp), Math.round(endTemp)) + '°F',
		c:
			dataRange(Math.round(convertToCelsius(startTemp)), Math.round(convertToCelsius(endTemp))) +
			'°C'
	};

	return parsedTemperature;
}
