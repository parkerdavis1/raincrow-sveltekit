import dayjs from '$lib/services/dayjsExtended';

export function parseSunrise(weatherResults) {
	const parsedSunrise = dayjs
		.utc(weatherResults.start.data[0].sunrise, 'X')
		.add(weatherResults.start.timezone_offset, 'seconds')
		.format('h:mma'); // need to use utc and offset by correct timezone offset so avoid issues when local timezone is different than checklist timezone

	return parsedSunrise;
}

export function parseSunset(weatherResults) {
	const parsedSunset = dayjs
		.utc(weatherResults.start.data[0].sunset, 'X')
		.add(weatherResults.start.timezone_offset, 'seconds')
		.format('h:mma'); // need to use utc and offset by correct timezone offset so avoid issues when local timezone is different than checklist timezone

	return parsedSunset;
}
