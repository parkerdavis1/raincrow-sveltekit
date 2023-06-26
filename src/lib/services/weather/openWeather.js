import dayjs from '$lib/services/dayjsExtended';
import { OPENWEATHER_KEY } from '$env/static/private';

async function queryOpenWeather(unixTime, lat, lon, lang = 'en') {
	// submit OpenWeather query at time and location
	const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall/timemachine';
	const queries = `?lat=${lat}&lon=${lon}&lang=${lang}&dt=${unixTime}&appid=${OPENWEATHER_KEY}&units=imperial`;
	try {
		const response = await fetch(baseUrl + queries);
		if (response.ok) {
			const jsonResponse = await response.json();
			console.log('Weather Response for ' + unixTime);
			console.log(jsonResponse);
			return jsonResponse;
		} else throw new Error(`${response.statusText} (code: ${response.status})`);
	} catch (error) {
		return error;
	}
}

export async function getTimezoneOffset(infoObj, dayjsTimes) {
	try {
		console.log('-----Timezone Query:-----');
		const timezoneResponse = await queryOpenWeather(
			dayjs(dayjsTimes.start.localTime).format('X'), // unix time
			infoObj.location.lat,
			infoObj.location.lon,
			'en'
		);
		if (timezoneResponse) {
			return timezoneResponse.timezone_offset;
		} else throw new Error('Error! Check that valid coordinates and time are entered.');
	} catch (error) {
		return error;
	}
}

export async function getWeatherForStartAndEnd(infoObj, dayjsTimes) {
	let weatherResults = {
		start: null,
		end: null
	};
	console.log(
		'Start time weather query for ' + dayjsTimes.start.utcTime.local().format('YYYY-MM-DD h:mma Z')
	);

	// TODO: Add try catch blocks
	weatherResults.start = await queryOpenWeather(
		dayjsTimes.start.utcTime.format('X'), // unix time
		infoObj.location.lat,
		infoObj.location.lon,
		infoObj.language
	);
	if (
		dayjsTimes.end.utcTime &&
		dayjsTimes.end.utcTime.format('X') != dayjsTimes.start.utcTime.format('X')
	) {
		console.log(
			'End time weather query for ' + dayjsTimes.end.utcTime.local().format('YYYY-MM-DD h:mma Z')
		);
		weatherResults.end = await queryOpenWeather(
			dayjsTimes.end.utcTime.format('X'), // unix time
			infoObj.location.lat,
			infoObj.location.lon,
			infoObj.language
		);
	}
	return weatherResults;
}
