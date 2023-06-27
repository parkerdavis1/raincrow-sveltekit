import postGetWeather from '$lib/services/postGetWeather.js';

export function load({ cookies }) {
	let defaultLanguage = 'en';
	// get cookie for language
	let languageCookie = cookies.get('lang');
	// if that cookie doesn't exist, create it, then assign its value to languageCookie variable
	if (!languageCookie) {
		cookies.set('lang', defaultLanguage, { path: '/', httpOnly: false, samesite: 'strict' });
		languageCookie = cookies.get('lang');
	}

	return {
		lang: languageCookie
	};
}

export const actions = {
	postGetWeather: postGetWeather
};
