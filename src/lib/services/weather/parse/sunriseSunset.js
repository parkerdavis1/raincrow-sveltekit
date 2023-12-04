import dayjs from '$lib/services/dayjsExtended';

export function parseSunrise(weatherResults, timeZoneOffset) {
	const parsedSunrise = dayjs
		.utc(weatherResults.start.data[0].sunrise, 'X')
		.add(timeZoneOffset, 'minutes')
		.format('h:mma'); // need to use utc and offset by correct timezone offset so avoid issues when local timezone is different than checklist timezone

	return parsedSunrise;
}

export function parseSunset(weatherResults, timeZoneOffset) {
	const parsedSunset = dayjs
		.utc(weatherResults.start.data[0].sunset, 'X')
		.add(timeZoneOffset, 'minutes')
		.format('h:mma'); // need to use utc and offset by correct timezone offset so avoid issues when local timezone is different than checklist timezone

	return parsedSunset;
}
