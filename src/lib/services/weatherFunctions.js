// DayJS functionality
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
dayjs.extend(advancedFormat);
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(customParseFormat);

// API keys
// import { openWeather } from './keys.json';

// Helpers
import { capitalizeFirst, dataRange } from '$lib/services/helpers';
import { _ } from '$lib/services/i18n';
import { get } from 'svelte/store';

// eBird / Weather Functions
export function parseWeather(times, weatherResults) {
	let parsedWeather = {
		icon: {
			open: '',
			emoji: ''
		},
		conditions: null,
		temperature: {
			f: null,
			c: null
		},
		windspeed: {
			mph: null,
			kmh: null,
			ms: null,
			beaufort: null,
			description: null
		},
		windDirection: {
			text: null,
			arrow: null
		},
		cloudCover: null,
		humidity: null,
		pressure: null,
		sunrise: null,
		sunset: null,
		timezone: null,
		attr: get(_)('weather.generated_by')
	};

	// Icon
	let icons = [];

	//  check for multiple icons, if they are unique, add them
	for (let obj of weatherResults.start.data[0].weather) {
		if (!icons.includes(obj.icon)) {
			icons.push(obj.icon);
		}
	}

	// if end weather, check for multiple icons; if they are unique, add them
	if (weatherResults.end) {
		for (let obj of weatherResults.end.data[0].weather) {
			if (!icons.includes(obj.icon)) {
				icons.push(obj.icon);
			}
		}
	}

	// display all icons
	for (let icon of icons) {
		parsedWeather.icon.open += `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Open Weather Icon">`;
	}

	// emoji icons
	for (let icon of icons) {
		if (icon === '01d' || icon === '01n') {
			parsedWeather.icon.emoji += '☀️';
		} else if (icon === '02d' || icon === '02n') {
			parsedWeather.icon.emoji += '🌤';
		} else if (icon === '03d' || icon === '03n') {
			parsedWeather.icon.emoji += '⛅️';
		} else if (icon === '04d' || icon === '04n') {
			parsedWeather.icon.emoji += '☁️';
		} else if (icon === '09d' || icon === '09n' || icon === '10d' || icon === '10n') {
			parsedWeather.icon.emoji += '🌧';
		} else if (icon === '11d' || icon === '11n') {
			parsedWeather.icon.emoji += '🌩';
		} else if (icon === '13d' || icon === '13n') {
			parsedWeather.icon.emoji += '❄️';
		} else if (icon === '50d' || icon === '50n') {
			parsedWeather.icon.emoji += '🌫';
		}
	}

	// CONDITION
	let conditions = [];
	// check for multiple conditions, if they are unique add them
	for (let obj of weatherResults.start.data[0].weather) {
		conditions.push(obj.description);
	}
	let endCondition = null;
	if (weatherResults.end) {
		for (let obj of weatherResults.end.data[0].weather) {
			if (!conditions.includes(obj.description)) {
				conditions.push(obj.description);
			}
		}
	}

	// format conditions based on number of different conditions
	if (conditions.length > 2) {
		parsedWeather.conditions = capitalizeFirst(conditions.join(', '));
	} else if (conditions.length === 2) {
		parsedWeather.conditions = capitalizeFirst(conditions.join(' - '));
	} else {
		parsedWeather.conditions = capitalizeFirst(conditions.join());
	}

	// TEMPERATURE
	let startTemp = weatherResults.start.data[0].temp;
	let endTemp;
	if (weatherResults.end) {
		endTemp = weatherResults.end.data[0].temp;
	}
	parsedWeather.temperature.f = dataRange(Math.round(startTemp), Math.round(endTemp)) + '°F';
	parsedWeather.temperature.c =
		dataRange(Math.round(convertToCelsius(startTemp)), Math.round(convertToCelsius(endTemp))) +
		'°C';

	// WINDSPEED
	let windspeed = {
		start: {
			avg: weatherResults.start.data[0].wind_speed,
			gusts: weatherResults.start.data[0].wind_gust
		},
		end: {
			avg: undefined,
			gusts: undefined
		}
	};
	if (weatherResults.end) {
		windspeed.end.avg = weatherResults.end.data[0].wind_speed;
		windspeed.end.gusts = weatherResults.start.data[0].wind_gust;
	}
	parsedWeather.windspeed.mph =
		dataRange(Math.round(windspeed.start.avg), Math.round(windspeed.end.avg)) + 'mph';
	parsedWeather.windspeed.ms =
		dataRange(Math.round(mphToMs(windspeed.start.avg)), Math.round(mphToMs(windspeed.end.avg))) +
		'm/s';
	parsedWeather.windspeed.kmh =
		dataRange(Math.round(mphToKmh(windspeed.start.avg)), Math.round(mphToKmh(windspeed.end.avg))) +
		'km/h';
	parsedWeather.windspeed.beaufort = dataRange(
		Math.round(mphToBeaufort(windspeed.start.avg)),
		Math.round(mphToBeaufort(windspeed.end.avg))
	);
	parsedWeather.windspeed.description = capitalizeFirst(
		dataRange(mphToDescription(windspeed.start.avg), mphToDescription(windspeed.end.avg))
	);
	if (windspeed.start.gusts || windspeed.end.gusts) {
		parsedWeather.windspeed.mph =
			parsedWeather.windspeed.mph +
			` (${dataRange(
				Math.round(windspeed.start.gusts),
				Math.round(windspeed.end.gusts)
			)}mph gusts)`;
		parsedWeather.windspeed.ms =
			parsedWeather.windspeed.ms +
			` (${dataRange(
				Math.round(mphToMs(windspeed.start.gusts)),
				Math.round(mphToMs(windspeed.end.gusts))
			)}m/s gusts)`;
		parsedWeather.windspeed.kmh =
			parsedWeather.windspeed.kmh +
			` (${dataRange(
				Math.round(mphToKmh(windspeed.start.gusts)),
				Math.round(mphToKmh(windspeed.end.gusts))
			)}km/h gusts)`;
		// Show entire range in two values for Beaufort and text description
		let windspeedArr = [
			windspeed.start.avg,
			windspeed.start.gusts,
			windspeed.end.avg,
			windspeed.end.gusts
		];
		let windspeedFilteredArr = windspeedArr.filter((entry) => entry || entry === 0);
		let sortedWindspeedArr = windspeedFilteredArr.sort((a, b) => a - b);
		parsedWeather.windspeed.beaufort = dataRange(
			Math.round(mphToBeaufort(sortedWindspeedArr[0])),
			Math.round(mphToBeaufort(sortedWindspeedArr[sortedWindspeedArr.length - 1]))
		);
		parsedWeather.windspeed.description = capitalizeFirst(
			dataRange(
				mphToDescription(sortedWindspeedArr[0]),
				mphToDescription(sortedWindspeedArr[sortedWindspeedArr.length - 1])
			)
		);
	}

	// WIND DIRECTION
	function convertDegreesToDirection(deg) {
		if ((deg >= 0 && deg < 22.5) || (deg >= 337.5 && deg <= 360)) {
			return get(_)('weather.direction.north');
		} else if (deg >= 22.5 && deg < 67.5) {
			return get(_)('weather.direction.north_east');
		} else if (deg >= 67.5 && deg < 112.5) {
			return get(_)('weather.direction.east');
		} else if (deg >= 112.5 && deg < 157.5) {
			return get(_)('weather.direction.south_east');
		} else if (deg >= 157.5 && deg < 202.5) {
			return get(_)('weather.direction.south');
		} else if (deg >= 202.5 && deg < 247.5) {
			return get(_)('weather.direction.south_west');
		} else if (deg >= 247.5 && deg < 292.5) {
			return get(_)('weather.direction.west');
		} else if (deg >= 292.5 && deg < 337.5) {
			return get(_)('weather.direction.north_west');
		}
	}
	function convertDegreesToArrow(deg) {
		if ((deg >= 0 && deg < 22.5) || (deg >= 337.5 && deg <= 360)) {
			return '↑';
		} else if (deg >= 22.5 && deg < 67.5) {
			return '↗';
		} else if (deg >= 67.5 && deg < 112.5) {
			return '→';
		} else if (deg >= 112.5 && deg < 157.5) {
			return '↘';
		} else if (deg >= 157.5 && deg < 202.5) {
			return '↓';
		} else if (deg >= 202.5 && deg < 247.5) {
			return '↙';
		} else if (deg >= 247.5 && deg < 292.5) {
			return '←';
		} else if (deg >= 292.5 && deg < 337.5) {
			return '↖';
		}
	}
	// Wrap this up in windspeed object to display at end of windspeed?
	if (weatherResults.end) {
		parsedWeather.windDirection.text = dataRange(
			convertDegreesToDirection(weatherResults.start.data[0].wind_deg),
			convertDegreesToDirection(weatherResults.end.data[0].wind_deg)
		);
		parsedWeather.windDirection.arrow = dataRange(
			convertDegreesToArrow(weatherResults.start.data[0].wind_deg),
			convertDegreesToArrow(weatherResults.end.data[0].wind_deg)
		);
	} else {
		parsedWeather.windDirection.text = convertDegreesToDirection(
			weatherResults.start.data[0].wind_deg
		);
		parsedWeather.windDirection.arrow = convertDegreesToArrow(
			weatherResults.start.data[0].wind_deg
		);
	}

	// CLOUD COVER
	let cloudCover = {
		start: weatherResults.start.data[0].clouds,
		end: null
	};
	if (weatherResults.end) {
		cloudCover.end = weatherResults.end.data[0].clouds;
	}
	parsedWeather.cloudCover = dataRange(cloudCover.start, cloudCover.end);

	// HUMIDITY
	let humidity = {
		start: weatherResults.start.data[0].humidity,
		end: null
	};
	if (weatherResults.end) {
		humidity.end = weatherResults.end.data[0].humidity;
	}
	parsedWeather.humidity = dataRange(humidity.start, humidity.end);

	// PRESSURE
	let pressure = {
		start: weatherResults.start.data[0].pressure,
		end: null
	};
	if (weatherResults.end) {
		pressure.end = weatherResults.end.data[0].pressure;
	}
	parsedWeather.pressure = dataRange(pressure.start, pressure.end);

	// SUNRISE
	let sunrise = dayjs
		.utc(weatherResults.start.data[0].sunrise, 'X')
		.add(times.offset, 'seconds')
		.format('h:mma'); // need to use utc and offset by correct timezone offset so avoid issues when local timezone is different than checklist timezone
	parsedWeather.sunrise = sunrise;

	// SUNSET
	let sunset = dayjs
		.utc(weatherResults.start.data[0].sunset, 'X')
		.add(times.offset, 'seconds')
		.format('h:mma'); // need to use utc and offset by correct timezone offset so avoid issues when local timezone is different than checklist timezone
	parsedWeather.sunset = sunset;

	// TIMEZONE - currently not being shown anywhere
	function timezoneParse(offset) {
		let offsetHr = offset / 60 / 60;
		return offsetHr + ':00';
	}

	parsedWeather.timezone = `Timezone: ${weatherResults.start.timezone} (${timezoneParse(
		times.offset
	)})`;

	return parsedWeather;
}

export async function getWeather(times, locationObj, weatherResults, language) {
	console.log(
		'Start time weather query for ' + times.start.utcTime.local().format('YYYY-MM-DD h:mma Z')
	);
	weatherResults.start = await queryOpenWeather(
		times.start.utcTime.format('X'),
		locationObj.lat,
		locationObj.lon,
		language
	);
	if (times.end.utcTime && times.end.utcTime.format('X') != times.start.utcTime.format('X')) {
		console.log(
			'End time weather query for ' + times.end.utcTime.local().format('YYYY-MM-DD h:mma Z')
		);
		weatherResults.end = await queryOpenWeather(
			times.end.utcTime.format('X'),
			locationObj.lat,
			locationObj.lon,
			language
		);
	}
	return weatherResults;
}
export function convertToUnixTime(times) {
	times.start.utcTime = dayjs(times.start.localTime).utc(true).subtract(times.offset, 'seconds');
	if (times.end.localTime) {
		times.end.utcTime = dayjs(times.end.localTime).utc(true).subtract(times.offset, 'seconds');
	}
	return times;
}
export function calculateEndTimePost(ebirdDateTime, durationHrs) {
	const startTime = dayjs(ebirdDateTime, 'YYYY-MM-DD HH:mm');
	const durationMinutes = durationHrs * 60;
	return startTime.add(durationMinutes, 'minute').format('YYYY-MM-DD HH:mm');
}
export async function getTimezoneOffset(times, locationObj) {
	const unixTime = dayjs(times.start.localTime).format('X');
	try {
		console.log('Timezone Query:');
		const timezoneQuery = await queryOpenWeather(unixTime, locationObj.lat, locationObj.lon);
		if (timezoneQuery) {
			times.offset = timezoneQuery.timezone_offset;
			return times;
		}
		// else throw new Error("Error! Check that valid coordinates and time are entered.")
	} catch (error) {
		throw error;
	}
}

export async function getChecklistInfo(checklistId) {
	console.log('-------New Request-------');
	const myHeaders = new Headers();
	myHeaders.append('X-eBirdApiToken', 'r0h8p3bh6k3v');
	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};

	let realChecklistId = extractChecklistId(checklistId);

	const checklistURL = 'https://api.ebird.org/v2/product/checklist/view/' + realChecklistId;

	// reset for each call
	let checklistInfo = {};
	let times = {
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
			times.start.localTime = dayjs(checklistInfo.startTime, 'YYYY-MM-DD HH:mm');
			checklistInfo.obsTimeValid = jsonResponse.obsTimeValid;
			if (jsonResponse.durationHrs) {
				checklistInfo.durationHrs = jsonResponse.durationHrs;
				checklistInfo.endTime = calculateEndTimePost(
					checklistInfo.startTime,
					checklistInfo.durationHrs
				);
				times.end.localTime = dayjs(checklistInfo.endTime, 'YYYY-MM-DD HH:mm');
			}
			console.log('Checklist info from eBird');
			console.log(jsonResponse);

			//get location coordinates
			const coordUrl = 'https://api.ebird.org/v2/ref/region/info/' + checklistInfo.locationId;

			const response2 = await fetch(coordUrl, requestOptions);
			if (response2.ok) {
				const jsonResponse2 = await response2.json();
				checklistInfo.lon = (jsonResponse2.bounds.maxX + jsonResponse2.bounds.minX) / 2; //get average point in middle of bounds
				checklistInfo.lat = (jsonResponse2.bounds.maxY + jsonResponse2.bounds.minY) / 2;
				checklistInfo.locationName = jsonResponse2.result;

				console.log('LocationId info from eBird');
				console.log(jsonResponse2);
				console.log('checklistInfo object: ');
				console.log(checklistInfo);
				return [checklistInfo, times];
			}
		}
	} catch (error) {
		console.log(error);
		return [error, error];
	}
}
function extractChecklistId(checklistId) {
	let checklistRegex = /S\d{7}\d*$/;
	let extractedId = checklistId.trim().match(checklistRegex);
	return extractedId[0];
}
export async function queryOpenWeather(unixTime, lat, lon, lang) {
	//submit OpenWeather query at time and location
	const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall/timemachine';
	const queries = `?lat=${lat}&lon=${lon}&lang=${lang}&dt=${unixTime}&appid=${openWeather}&units=imperial`;
	// const queries = `?lat=${lat}&lon=${lon}&dt=error&appid=${openWeather}&units=imperial`; // trigger errors for debug
	try {
		const response = await fetch(baseUrl + queries);
		if (response.ok) {
			const jsonResponse = await response.json();
			console.log('Weather Response for ' + unixTime);
			console.log(jsonResponse);
			return jsonResponse;
		} else throw new Error(`${response.statusText} (code: ${response.status})`);
	} catch (error) {
		throw error;
	}
}

function convertToCelsius(tempF) {
	return (5 / 9) * (tempF - 32);
}
function mphToMs(mph) {
	// -> KM -> M -> MIN -> SEC
	return (mph * 1.6093 * 1000) / 60 / 60;
}
function mphToKmh(mph) {
	// -> KM
	return mph * 1.6093;
}
function mphToBeaufort(mph) {
	if (mph >= 0 && mph <= 1) {
		return 0;
	} else if (mph > 1 && mph <= 3) {
		return 1;
	} else if (mph > 3 && mph <= 7) {
		return 2;
	} else if (mph > 7 && mph <= 12) {
		return 3;
	} else if (mph > 12 && mph <= 18) {
		return 4;
	} else if (mph > 18 && mph <= 24) {
		return 5;
	} else if (mph > 24 && mph <= 31) {
		return 6;
	} else if (mph > 31 && mph <= 38) {
		return 7;
	} else if (mph > 38 && mph <= 46) {
		return 8;
	} else if (mph > 46 && mph <= 54) {
		return 9;
	} else if (mph > 54 && mph <= 63) {
		return 10;
	} else if (mph > 63 && mph <= 72) {
		return 11;
	} else if (mph > 72 && mph <= 83) {
		return 12;
	}
}
function mphToDescription(mph) {
	if (mph >= 0 && mph <= 1) {
		return get(_)('weather.wind_description.calm');
	} else if (mph > 1 && mph <= 3) {
		return get(_)('weather.wind_description.mostly_calm');
	} else if (mph > 3 && mph <= 7) {
		return get(_)('weather.wind_description.light_breeze');
	} else if (mph > 7 && mph <= 12) {
		return get(_)('weather.wind_description.gentle_breeze');
	} else if (mph > 12 && mph <= 18) {
		return get(_)('weather.wind_description.moderate_breeze');
	} else if (mph > 18 && mph <= 24) {
		return get(_)('weather.wind_description.fresh_breeze');
	} else if (mph > 24 && mph <= 31) {
		return get(_)('weather.wind_description.strong_breeze');
	} else if (mph > 31 && mph <= 38) {
		return get(_)('weather.wind_description.near_gale');
	} else if (mph > 38 && mph <= 46) {
		return get(_)('weather.wind_description.gale');
	} else if (mph > 46 && mph <= 54) {
		return get(_)('weather.wind_description.severe_gale');
	} else if (mph > 54 && mph <= 63) {
		return get(_)('weather.wind_description.storm');
	} else if (mph > 63 && mph <= 72) {
		return get(_)('weather.wind_description.violent_storm');
	} else if (mph > 72 && mph <= 83) {
		return get(_)('weather.wind_description.hurricane');
	}
}
