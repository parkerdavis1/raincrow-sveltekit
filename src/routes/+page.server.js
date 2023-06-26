import { getChecklistInfo } from '$lib/services/weather/getChecklistInfo';
import { getTimezoneOffset, getWeatherForStartAndEnd } from '$lib/services/weather/openWeather';
import { appendCalculatedUnixTimes } from '$lib/services/weather/appendCalculatedUnixTimes';

export const actions = {
	postGetWeather: async ({ fetch, request }) => {
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
			language: 'en'
		};

		// get checklist info
		const checklistResponse = await getChecklistInfo({ checklistId, fetch }); // "special" fetch is used so it can be intercepted by the server hooks
		if (checklistResponse.error) return { error: checklistResponse.error };
		responseObj.checklistInfo = checklistResponse.checklistInfo;
		responseObj.location = checklistResponse.location;
		dayjsTimes = checklistResponse.dayjsTimes;

		// return error messages if encountered

		// get timezone offset
		dayjsTimes.offset = await getTimezoneOffset(responseObj, dayjsTimes);
		dayjsTimes = appendCalculatedUnixTimes(dayjsTimes);

		// return error messages if encountered

		// query weather
		responseObj.weatherResults = await getWeatherForStartAndEnd(responseObj, dayjsTimes);

		// return error messages if encountered

		return responseObj;
	}
};
