import { getWeatherForStartAndEnd } from '$lib/services/weather/openWeather';
import { parseLatlon } from '$lib/services/parseLatlon';
import dayjs from '$lib/services/dayjsExtended';
import { fail } from '@sveltejs/kit';
import {
	validateLatlon,
	validateDate,
	validateStartTime,
	validateDuration
} from '$lib/services/validation';
import { find } from 'geo-tz';

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
			unixTime: null
		},
		end: {
			localTime: null,
			unixTime: null
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

	// ---- Get unixtime from timezone ----
	const tz = find(preWeather.location.lat, preWeather.location.lon);
	dayjsTimes.start.unixTime = dayjsTimes.start.localTime.tz(tz, true).unix();
	if (dayjsTimes.end.localTime) {
		dayjsTimes.end.unixTime = dayjsTimes.end.localTime.tz(tz, true).unix();
	}

	// ---- Query weather ----
	preWeather.weatherResults = await getWeatherForStartAndEnd(preWeather, dayjsTimes, fetch);
	if (preWeather.weatherResults.error) {
		return fail(400, {
			...errorObj,
			type: 'GetWeatherForStartAndEnd error',
			message: preWeather.weatherResults.error
		});
	}

	return { preWeather };
}
