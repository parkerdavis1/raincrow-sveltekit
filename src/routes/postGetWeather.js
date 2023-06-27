import { getChecklistInfo } from '$lib/services/weather/getChecklistInfo';
import { getTimezoneOffset, getWeatherForStartAndEnd } from '$lib/services/weather/openWeather';
import { appendCalculatedUtcTimes } from '$lib/services/weather/appendCalculatedUtcTimes';

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

	let responseObj = {
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

	// TODO: add server-side form validation

	// ---- Get checklist info ----
	const checklistResponse = await getChecklistInfo(checklistId, fetch); // "special" fetch is used so it can be intercepted by the server hooks
	if (checklistResponse.error) return { error: checklistResponse.error }; // Return errors if they exist

	// Handle data
	responseObj.checklistInfo = checklistResponse.checklistInfo;
	responseObj.location = checklistResponse.location;
	dayjsTimes = checklistResponse.dayjsTimes;

	// ---- Get timezone offset ----
	dayjsTimes = await getTimezoneOffset(responseObj, dayjsTimes, lang, fetch);
	if (dayjsTimes.error) return { error: dayjsTimes.error }; // Return errors if they exist
	dayjsTimes = appendCalculatedUtcTimes(dayjsTimes); // Append UTC Unix Times

	// ---- Query weather ----
	responseObj.weatherResults = await getWeatherForStartAndEnd(responseObj, dayjsTimes, lang, fetch);
	if (responseObj.weatherResults.error) return { error: responseObj.weatherResults.error }; // Return errors if they exist

	// ---- Append offset to responseObj ----
	responseObj.timeZoneOffset = dayjsTimes.offset;

	return {
		postWeather: responseObj
	};
}
