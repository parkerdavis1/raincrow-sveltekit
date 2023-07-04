import { getTimezoneOffset, getWeatherForStartAndEnd } from '$lib/services/weather/openWeather';
import { appendCalculatedUtcTimes } from '$lib/services/weather/appendCalculatedUtcTimes';
import { parseLatlon } from '$lib/services/parseLatlon';
import dayjs from '$lib/services/dayjsExtended';
import { fail } from '@sveltejs/kit';
import {
	validateLatlon,
	validateDate,
	validateStartTime,
	validateDuration
} from '$lib/services/validation';

export default async function preGetWeather({ fetch, request, cookies }) {
	const lang = cookies.get('lang');
	const data = await request.formData();
	const latlon = data.get('latlon');
	const date = data.get('date');
	const startTime = data.get('startTime');
	const duration = parseInt(data.get('duration'));

	let dayjsTimes = {
		offset: 0,
		start: {
			localTime: null,
			utcTime: null
		},
		end: {
			localTime: null,
			utcTime: null
		}
	};

	let preWeather = {
		location: {
			lat: null,
			lon: null
		},
		weatherResults: {
			start: null,
			end: null
		},
		language: lang,
		timeZoneOffset: null
	};

	// ---- Server-side form validation ----
	let errorObj = {
		error: true,
		view: 'pre',
		errors: [],
		latlon,
		date,
		startTime,
		duration
	};
	if (
		!validateLatlon(latlon) ||
		!validateDate(date) ||
		!validateStartTime(startTime) ||
		!validateDuration(duration)
	) {
		if (!validateLatlon(latlon)) errorObj.errors.push('latlon');
		if (!validateDate(date)) errorObj.errors.push('date');
		if (!validateStartTime(startTime)) errorObj.errors.push('startTime');
		if (!validateDuration(duration)) errorObj.errors.push('duration');
		return fail(400, errorObj);
	}

	// ---- Handle data ----
	preWeather.location = parseLatlon(latlon);
	dayjsTimes.start.localTime = dayjs(`${date} ${startTime}`, 'YYYY-MM-DD HH:mm');
	dayjsTimes.end.localTime = dayjs(dayjsTimes.start.localTime).add(duration, 'minute');

	// ---- Get timezone offset ----
	dayjsTimes = await getTimezoneOffset(preWeather, dayjsTimes, fetch);
	if (dayjsTimes.error) return { preError: dayjsTimes.error };
	dayjsTimes = appendCalculatedUtcTimes(dayjsTimes);

	// ---- Query weather ----
	preWeather.weatherResults = await getWeatherForStartAndEnd(preWeather, dayjsTimes, fetch);
	if (preWeather.weatherResults.error) return { preError: preWeather.weatherResults.error };

	// ---- Append offset to preWeather ----
	preWeather.timeZoneOffset = dayjsTimes.offset;

	return { preWeather };
}
