import postGetWeather from './postGetWeather';
import preGetWeather from './preGetWeather';
import { defaultLanguage, defaultOptions } from '../lib/services/defaults';

export function load({ cookies }) {
	// ---- LANGUAGE ----
	// Get cookie for language. If that cookie doesn't exist, create it, then assign its value to languageCookie variable
	let languageCookie = cookies.get('lang');
	if (!languageCookie) {
		cookies.set('lang', defaultLanguage, { path: '/', httpOnly: false, samesite: 'strict' });
		languageCookie = cookies.get('lang');
	}

	// ---- OPTIONS -----
	let optionsCookie = cookies.get('options');
	if (!optionsCookie) {
		cookies.set('options', JSON.stringify(defaultOptions), {
			path: '/',
			httpOnly: false,
			samesite: 'strict'
		});
		optionsCookie = cookies.get('options');
	}

	return {
		lang: languageCookie,
		options: optionsCookie
	};
}

export const actions = {
	postGetWeather: postGetWeather,
	preGetWeather: preGetWeather
};
