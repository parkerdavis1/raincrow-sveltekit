import { dataRange } from '$lib/services/helpers';

export function parseHumidity(weatherResults) {
	let humidity = {
		start: weatherResults.start.data[0].humidity,
		end: weatherResults.end?.data[0].humidity
	};
	let parsedHumidity = dataRange(humidity.start, humidity.end);

	return parsedHumidity;
}
