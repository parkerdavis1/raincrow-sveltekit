import { getChecklistInfo } from '$lib/services/weather/getChecklistInfo';
import { getTimezoneOffset, getWeatherForStartAndEnd } from '$lib/services/weather/openWeather';
import { appendCalculatedUtcTimes } from '$lib/services/weather/appendCalculatedUtcTimes';
import { validateChecklistId } from '$lib/services/validation';
import { fail } from '@sveltejs/kit';

export default async function postGetWeather({ fetch, request, cookies }) {
	const lang = cookies.get('lang');
	const data = await request.formData();
	const checklistId = data.get('checklistId');

	// dayjsTimes needs to be kept separate from the response
	// object because you cannot send dayjs objects via JSON
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
		language: 'en',
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

	// ---- Get timezone offset ----
	dayjsTimes = await getTimezoneOffset(postWeather, dayjsTimes, lang, fetch);
	// if (dayjsTimes.error) return { postError: dayjsTimes.error }; // Return errors if they exist
	if (dayjsTimes.error)
		return fail(400, {
			type: 'openweatherResponse',
			message: dayjsTimes.error,
			checklistId
		});

	dayjsTimes = appendCalculatedUtcTimes(dayjsTimes); // Append UTC Unix Times

	// ---- Query weather ----
	postWeather.weatherResults = await getWeatherForStartAndEnd(postWeather, dayjsTimes, lang, fetch);
	// if (postWeather.weatherResults.error) return { postError: postWeather.weatherResults.error }; // Return errors if they exist
	if (postWeather.weatherResults.error)
		return fail(400, {
			type: 'openweatherResponse',
			message: postWeather.weatherResults.error,
			checklistId
		});

	// ---- Append offset to postWeather ----
	postWeather.timeZoneOffset = dayjsTimes.offset;

	return { postWeather };
}
