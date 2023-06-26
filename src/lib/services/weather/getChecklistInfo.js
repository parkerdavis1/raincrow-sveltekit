import dayjs from '$lib/services/dayjsExtended';
import { EBIRD_KEY } from '$env/static/private';

export async function getChecklistInfo({ checklistId, fetch }) {
	// structure of returned objects
	let checklistInfo = {
		checklistId: null,
		locationId: null,
		startTime: null,
		obsTimeValid: null,
		durationHrs: null,
		endTime: null,
		locationName: null
	};

	let location = {
		lat: null,
		lon: null
	};

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

	console.log('-------New Request-------');
	const myHeaders = new Headers();
	myHeaders.append('X-eBirdApiToken', EBIRD_KEY);
	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};
	const realChecklistId = extractChecklistId(checklistId);
	const checklistURL = 'https://api.ebird.org/v2/product/checklist/view/' + realChecklistId;

	try {
		const response = await fetch(checklistURL, requestOptions);
		if (!response.ok) {
			console.log(response);
			throw response;
		}
		if (response.ok) {
			const jsonResponse = await response.json();
			checklistInfo.checklistId = jsonResponse.subId;
			checklistInfo.locationId = jsonResponse.locId;
			checklistInfo.startTime = jsonResponse.obsDt;
			dayjsTimes.start.localTime = dayjs(checklistInfo.startTime, 'YYYY-MM-DD HH:mm');
			checklistInfo.obsTimeValid = jsonResponse.obsTimeValid;
			if (jsonResponse.durationHrs) {
				checklistInfo.durationHrs = jsonResponse.durationHrs;
				checklistInfo.endTime = calculateEndTime(
					checklistInfo.startTime,
					checklistInfo.durationHrs
				);
				dayjsTimes.end.localTime = dayjs(checklistInfo.endTime, 'YYYY-MM-DD HH:mm');
			}

			//get location coordinates
			const coordUrl = 'https://api.ebird.org/v2/ref/region/info/' + checklistInfo.locationId;

			const response2 = await fetch(coordUrl, requestOptions);
			if (response2.ok) {
				const jsonResponse2 = await response2.json();
				location.lat = (jsonResponse2.bounds.maxY + jsonResponse2.bounds.minY) / 2;
				location.lon = (jsonResponse2.bounds.maxX + jsonResponse2.bounds.minX) / 2; //get average point in middle of bounds
				checklistInfo.locationName = jsonResponse2.result;

				return { checklistInfo, dayjsTimes, location };
			}
		}
	} catch (error) {
		console.log(error);
		return { error };
	}
}

function extractChecklistId(checklistId) {
	let checklistRegex = /S\d{7}\d*$/;
	let extractedId = checklistId.trim().match(checklistRegex);
	return extractedId[0];
}

function calculateEndTime(ebirdDateTime, durationHrs) {
	const startTime = dayjs(ebirdDateTime, 'YYYY-MM-DD HH:mm');
	const durationMinutes = durationHrs * 60;
	return startTime.add(durationMinutes, 'minute').format('YYYY-MM-DD HH:mm');
}
