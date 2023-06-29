import { dataRange } from '$lib/services/helpers';

export function parsePressure(weatherResults) {
	const pressure = {
		start: weatherResults.start.data[0].pressure,
		end: weatherResults.end?.data[0].pressure
	};

	const parsedPressure = dataRange(pressure.start, pressure.end);
	return parsedPressure;
}
