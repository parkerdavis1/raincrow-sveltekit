import { writable, derived, get, readable } from 'svelte/store';
import { _ } from './services/i18n';
import { setWithExpiry, getWithExpiry } from './services/limiter';

let defaultOptions = {
	conditions: true,
	temperature: true,
	temperatureUnit: 'f',
	windspeed: true,
	windUnit: 'description',
	windDirection: true,
	windDirectionType: 'text',
	sunrise: true,
	sunset: true,
	cloudCover: true,
	humidity: true,
	pressure: false,
	icon: true,
	iconType: 'emoji',
	attr: true
};
// Get user option preferences from local store, if no local store use default options
export const options = writable(
	JSON.parse(localStorage.getItem('storedOptions')) || defaultOptions
);
// When options change, change the local store
options.subscribe((value) => (localStorage.storedOptions = JSON.stringify(value)));

// Language preference
let defaultLanguage = 'en';
export const language = writable(
	JSON.parse(localStorage.getItem('storedLanguage')) || defaultLanguage
);
language.subscribe((value) => (localStorage.storedLanguage = JSON.stringify(value)));

// Daily request count
export const dailyCount = writable(getWithExpiry('dailyCount') || '0');
dailyCount.subscribe((value) => setWithExpiry('dailyCount', value, 43200000)); //43200000 is 12 hours

export const dailyCountError = derived(dailyCount, ($dailyCount) => {
	console.log('Checking dailyCount: ', $dailyCount);
	if ($dailyCount >= 5) {
		return true;
	} else {
		return false;
	}
});

// parsed weather
export let postParsedWeather = writable({
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
	timezone: null
});
export let preParsedWeather = writable({
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
	timezone: null
});

// render clipboard copy text
function renderCopyText(options, parsedWeather) {
	let textReturn = '';
	if (options.icon) {
		if (options.iconType === 'open') {
			textReturn += parsedWeather.icon.open;
		} else if (options.iconType === 'emoji') {
			textReturn += parsedWeather.icon.emoji;
		}
		textReturn += '\n';
	}
	if (options.conditions) {
		textReturn += parsedWeather.conditions;
		textReturn += '\n';
	}
	if (options.temperature) {
		textReturn += get(_)('weather.temperature') + ': ';
		textReturn +=
			options.temperatureUnit === 'c' ? parsedWeather.temperature.c : parsedWeather.temperature.f;
		textReturn += '\n';
	}
	if (options.windspeed) {
		textReturn += get(_)('weather.wind') + ': ';
		if (options.windUnit === 'description') {
			textReturn += parsedWeather.windspeed.description;
		} else if (options.windUnit === 'beaufort') {
			textReturn += 'Beaufort force ';
			textReturn += parsedWeather.windspeed.beaufort;
		} else if (options.windUnit === 'mph') {
			textReturn += parsedWeather.windspeed.mph;
		} else if (options.windUnit === 'kmh') {
			textReturn += parsedWeather.windspeed.kmh;
		} else if (options.windUnit === 'ms') {
			textReturn += parsedWeather.windspeed.ms;
		}
		textReturn += '\n';
	}
	if (options.windDirection) {
		textReturn += get(_)('weather.wind_direction') + ': ';
		textReturn += parsedWeather.windDirection.text;
		textReturn += '\n';
	}
	if (options.cloudCover) {
		textReturn += get(_)('weather.cloud_cover') + ': ';
		textReturn += parsedWeather.cloudCover + '%';
		textReturn += '\n';
	}
	if (options.humidity) {
		textReturn += get(_)('weather.humidity') + ': ';
		textReturn += parsedWeather.humidity + '%';
		textReturn += '\n';
	}
	if (options.pressure) {
		textReturn += get(_)('weather.pressure') + ': ';
		textReturn += parsedWeather.pressure + ' hPa';
		textReturn += '\n';
	}
	if (options.sunrise) {
		textReturn += get(_)('weather.sunrise') + ': ';
		textReturn += parsedWeather.sunrise;
		textReturn += '\n';
	}
	if (options.sunset) {
		textReturn += get(_)('weather.sunset') + ': ';
		textReturn += parsedWeather.sunset;
		textReturn += '\n';
	}
	if (options.attr) {
		textReturn += get(_)('weather.generated_by');
		textReturn += '\n';
	}
	textReturn = textReturn.slice(0, textReturn.length - 1); //remove last \n
	return textReturn;
}
export let postWeatherCopy = derived(
	[options, postParsedWeather],
	([$options, $postParsedWeather]) => {
		return renderCopyText($options, $postParsedWeather);
	}
);
export let preWeatherCopy = derived(
	[options, preParsedWeather],
	([$options, $preParsedWeather]) => {
		return renderCopyText($options, $preParsedWeather);
	}
);

// application state
export let postStatus = writable('init');
export let postErrorText = writable('');
export let postChecklistInfo = writable({});

export let preStatus = writable('init');
export let preFormInput = writable({
	latlon: '',
	date: '',
	startTime: '',
	duration: 0
});

export let preFormErrors = writable({
	// aka Errors
	latlon: false,
	date: false,
	startTime: false,
	duration: false
});

export let preErrorText = writable('');

export let aboutView = writable(false);
export let optionsView = writable(false);
export let viewingPost = writable(JSON.parse(localStorage.getItem('viewingPost')) || false);
viewingPost.subscribe((value) => (localStorage.viewingPost = JSON.stringify(value)));
