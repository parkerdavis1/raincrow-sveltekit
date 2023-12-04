import { getChecklistInfo } from '$lib/services/weather/getChecklistInfo';
import { getWeatherForStartAndEnd } from '$lib/services/weather/openWeather';
import { validateChecklistId } from '$lib/services/validation';
import { fail } from '@sveltejs/kit';
import { find } from 'geo-tz';

export default async function postGetWeather({ fetch, request, cookies }) {
	const lang = cookies.get('lang');
	console.log('LANG FROM COOKIE', lang);
	const data = await request.formData();
	const checklistId = data.get('checklistId');

	// dayjsTimes needs to be kept separate from the response
	// object because you cannot send dayjs objects via JSON
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

	let postWeather = {
		checklistInfo: {
			checklistId: null,
			locationId: null,
			startTime: null,
			obsTimeValid: null,
			durationHrs: null,
			endTime: null,
			lat: null,
			lon: null,
			locationName: null
		},
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
	if (!validateChecklistId(checklistId)) {
		return fail(400, {
			type: 'checklistValidate',
			checklistId
		});
	}

	// ---- Get checklist info ----
	const checklistResponse = await getChecklistInfo(checklistId, fetch); // svelte fetch is used so it can be intercepted by the server hooks
	// if (checklistResponse.error) return { postError: checklistResponse.error }; // Return errors if they exist
	if (checklistResponse.error) {
		return fail(400, {
			type: 'checklistResponse',
			message: checklistResponse.error,
			checklistId
		});
	}

	// ---- Handle data ----
	postWeather.checklistInfo = checklistResponse.checklistInfo;
	postWeather.location = checklistResponse.location;
	dayjsTimes = checklistResponse.dayjsTimes;
	console.log('postWeather', postWeather);
	console.log('dayjsTimes', dayjsTimes);

	// ---- Get unixtime from timezone ----
	const tz = find(postWeather.location.lat, postWeather.location.lon);
	console.log('timezone', tz);
	dayjsTimes.start.unixTime = dayjsTimes.start.localTime.tz(tz, true).unix();
	if (dayjsTimes.end.localTime) {
		dayjsTimes.end.unixTime = dayjsTimes.end.localTime.tz(tz, true).unix();
	}
	console.log('unixTimes included', dayjsTimes);
	// ---- Append offset to postWeather ----
	postWeather.timeZoneOffset = dayjsTimes.start.localTime.tz(tz, true).utcOffset();
	console.log('timezoneOffset', postWeather.timeZoneOffset);

	// ---- Query weather ----
	postWeather.weatherResults = await getWeatherForStartAndEnd(postWeather, dayjsTimes, fetch);
	// if (postWeather.weatherResults.error) return { postError: postWeather.weatherResults.error }; // Return errors if they exist
	if (postWeather.weatherResults.error) {
		return fail(400, {
			type: 'openweatherResponse',
			message: postWeather.weatherResults.error,
			checklistId
		});
	}
	console.log('postWeather', postWeather);

	return { postWeather };
}
