import { OPENWEATHER_KEY } from '$env/static/private';

async function queryOpenWeather(unixTime, lat, lon, lang, fetch) {
	// async function queryOpenWeather(unixTime, lat, lon, lang = 'en') {
	// submit OpenWeather query at time and location
	const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall/timemachine';
	const queries = `?lat=${lat}&lon=${lon}&lang=${lang}&dt=${unixTime}&appid=${OPENWEATHER_KEY}&units=imperial`;
	const response = await fetch(baseUrl + queries);
	if (response.ok) {
		const jsonResponse = await response.json();
		console.log('Weather Response for ' + unixTime);
		console.log(jsonResponse);
		return jsonResponse;
	} else throw `${response.statusText} (code: ${response.status})`;
}

export async function getWeatherForStartAndEnd(infoObj, dayjsTimes, fetch) {
	let weatherResults = {
		start: null,
		end: null
	};

	try {
		console.log('Start time weather query for ' + dayjsTimes.start.unixTime);
		weatherResults.start = await queryOpenWeather(
			dayjsTimes.start.unixTime,
			infoObj.location.lat,
			infoObj.location.lon,
			infoObj.language,
			fetch
		);

		if (dayjsTimes.end.unixTime && dayjsTimes.end.unixTime != dayjsTimes.start.unixTime) {
			console.log('End time weather query for ' + dayjsTimes.end.unixTime);
			weatherResults.end = await queryOpenWeather(
				dayjsTimes.end.unixTime,
				infoObj.location.lat,
				infoObj.location.lon,
				infoObj.language,
				fetch
			);
		}
	} catch (error) {
		return { error };
	}
	return weatherResults;
}
