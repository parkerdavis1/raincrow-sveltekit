import { writable, derived } from 'svelte/store';
import { setWithExpiry, getWithExpiry } from '$lib/services/limiter';
import { renderCopyText } from '$lib/services/renderCopyText';
import { defaultOptions } from '$lib/services/defaults';
import { browser } from '$app/environment';

// export const options = writable();
export const options = writable(
	JSON.parse(localStorage.getItem('storedOptions')) || defaultOptions
);
// When options change, change the local store
options.subscribe((value) => {
	if (browser) {
		localStorage.storedOptions = JSON.stringify(value);
	}
});

// Language preference
export const language = writable('');
export const languageChange = writable(Date.now());

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
export let postChecklistId = writable('');
export let postChecklistInfo = writable({});
export let postTimes = writable({});

export let preStatus = writable('init');
export let preErrorText = writable('Error');
export let preFormInput = writable(
	JSON.parse(sessionStorage.getItem('preFormInput')) || {
		latlon: '',
		date: '',
		startTime: '',
		duration: 0
	}
);
preFormInput.subscribe((value) => (sessionStorage.preFormInput = JSON.stringify(value)));

export let preFormValidationErrors = writable({
	latlon: false,
	date: false,
	startTime: false,
	duration: false
});

export let aboutView = writable(false);
export let optionsView = writable(false);
export let viewingPost = writable(JSON.parse(localStorage.getItem('viewingPost')) || false);
viewingPost.subscribe((value) => (localStorage.viewingPost = JSON.stringify(value)));
