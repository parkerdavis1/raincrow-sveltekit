import { get } from 'svelte/store';
import { _ } from '$lib/services/i18n';

export function convertToCelsius(tempF) {
	if (typeof tempF !== 'number') throw Error('Input must be a number');

	return (5 / 9) * (tempF - 32);
}

export function mphToMs(mph) {
	if (typeof mph !== 'number') throw Error('Input must be a number');
	if (mph < 0) throw Error('Number must be non-negative');

	// -> KM -> M -> MIN -> SEC
	return (mph * 1.6093 * 1000) / 60 / 60;
}

export function mphToKmh(mph) {
	if (typeof mph !== 'number') throw Error('Input must be a number');
	if (mph < 0) throw Error('Number must be non-negative');

	// -> KM
	return mph * 1.6093;
}

export function mphToBeaufort(mph) {
	if (typeof mph !== 'number') throw Error('Input must be a number');
	if (mph < 0) throw Error('Number must be non-negative');

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

export function mphToDescription(mph) {
	if (typeof mph !== 'number') throw Error('Input must be a number');
	if (mph < 0) throw Error('Number must be non-negative');

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

const conversions = {
	convertToCelsius,
	mphToMs,
	mphToKmh,
	mphToBeaufort,
	mphToDescription
};

export default conversions;
