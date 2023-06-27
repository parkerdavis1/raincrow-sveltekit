import postGetWeather from './postGetWeather';

export function load({ cookies }) {
	let defaultLanguage = 'en';
	// Get cookie for language. If that cookie doesn't exist, create it, then assign its value to languageCookie variable
	let languageCookie = cookies.get('lang');
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
