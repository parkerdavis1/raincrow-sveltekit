import { dataRange, capitalizeFirst } from '$lib/services/helpers';
import conversions from '$lib/services/conversions';

export function parseWindspeed(weatherResults) {
	let windspeed = {
		start: {
			avg: weatherResults.start.data[0].wind_speed,
			gusts: weatherResults.start.data[0].wind_gust
		},
		end: {
			avg: weatherResults.end.data[0].wind_speed,
			gusts: weatherResults.end.data[0].wind_gust
		}
	};

	let parsedWindspeed = {
		mph: dataRange(Math.round(windspeed.start.avg), Math.round(windspeed.end.avg)) + 'mph',
		ms:
			dataRange(
				Math.round(conversions.mphToMs(windspeed.start.avg)),
				Math.round(conversions.mphToMs(windspeed.end.avg))
			) + 'm/s',
		kmh:
			dataRange(
				Math.round(conversions.mphToKmh(windspeed.start.avg)),
				Math.round(conversions.mphToKmh(windspeed.end.avg))
			) + 'km/h',
		beaufort: dataRange(
			Math.round(conversions.mphToBeaufort(windspeed.start.avg)),
			Math.round(conversions.mphToBeaufort(windspeed.end.avg))
		),
		description: capitalizeFirst(
			dataRange(
				conversions.mphToDescription(windspeed.start.avg),
				conversions.mphToDescription(windspeed.end.avg)
			)
		)
	};

	// ----- GUSTS -----
	if (windspeed.start.gusts || windspeed.end.gusts) {
		// MPH
		parsedWindspeed.mph =
			parsedWindspeed.mph +
			` (${dataRange(
				Math.round(windspeed.start.gusts),
				Math.round(windspeed.end.gusts)
			)}mph gusts)`;
		// M/S
		parsedWindspeed.ms =
			parsedWindspeed.ms +
			` (${dataRange(
				Math.round(conversions.mphToMs(windspeed.start.gusts)),
				Math.round(conversions.mphToMs(windspeed.end.gusts))
			)}m/s gusts)`;
		// KM/H
		parsedWindspeed.kmh =
			parsedWindspeed.kmh +
			` (${dataRange(
				Math.round(conversions.mphToKmh(windspeed.start.gusts)),
				Math.round(conversions.mphToKmh(windspeed.end.gusts))
			)}km/h gusts)`;

		// Show entire range in two values for Beaufort and text description
		let windspeedArr = [
			windspeed.start.avg,
			windspeed.start.gusts,
			windspeed.end.avg,
			windspeed.end.gusts
		];
		// filter out undefined
		let windspeedFilteredArr = windspeedArr.filter((entry) => entry || entry === 0);
		// sort
		let sortedWindspeedArr = windspeedFilteredArr.sort((a, b) => a - b);
		// Beaufort
		parsedWindspeed.beaufort = dataRange(
			Math.round(conversions.mphToBeaufort(sortedWindspeedArr[0])),
			Math.round(conversions.mphToBeaufort(sortedWindspeedArr[sortedWindspeedArr.length - 1]))
		);
		// Description
		parsedWindspeed.description = capitalizeFirst(
			dataRange(
				conversions.mphToDescription(sortedWindspeedArr[0]),
				conversions.mphToDescription(sortedWindspeedArr[sortedWindspeedArr.length - 1])
			)
		);
	}

	return parsedWindspeed;
}
