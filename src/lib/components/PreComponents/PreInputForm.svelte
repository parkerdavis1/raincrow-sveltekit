<script>
	import { _ } from '$lib/services/i18n';
	import dayjs from 'dayjs';

	// Components
	import FormLocate from '$lib/components/PreComponents/FormLocate.svelte';
	import FormDate from '$lib/components/PreComponents/FormDate.svelte';
	import FormStartTime from '$lib/components/PreComponents/FormStartTime.svelte';
	import FormDuration from '$lib/components/PreComponents/FormDuration.svelte';

	// Weather Functions
	import {
		getTimezoneOffset,
		convertToUnixTime,
		getWeather,
		parseWeather
	} from '$lib/services/weatherFunctions';

	// Stores
	import {
		preStatus,
		dailyCount,
		dailyCountError,
		language,
		preParsedWeather,
		preErrorText,
		preFormInput,
		preFormErrors
	} from '$lib/store';

	// Date Time
	const currentDateTime = dayjs();

	$: {
		if ($language) handleGetWeather();
	}

	// latlon Parser
	const parseLatlon = (latlon) => {
		const parenRemoveRegex = /(\(|\))/g;
		const latlonNoParen = latlon.replace(parenRemoveRegex, ''); // remove parenthesis
		let commaIndex = latlonNoParen.indexOf(',');
		return {
			lat: latlonNoParen.slice(0, commaIndex).trim(),
			lon: latlonNoParen.slice(commaIndex + 1).trim()
		};
	};

	// Submit & Error Handling
	const handleGetWeather = async () => {
		// Initial Time Object
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

		// Initial Weather Results Object
		let weatherResults = {
			start: null,
			end: null
		};

		// Location Obj
		let location = {
			lat: null,
			lon: null
		};

		if (!formIsValid || $dailyCountError) {
			return;
		}
		$preStatus = 'loading';
		location = parseLatlon($preFormInput.latlon);
		times.start.localTime = dayjs(
			$preFormInput.date + ' ' + $preFormInput.startTime,
			'YYYY-MM-DD HH:mm'
		);
		times.end.localTime = dayjs(times.start.localTime).add($preFormInput.duration, 'minute');
		try {
			times = await getTimezoneOffset(times, location);
			times = convertToUnixTime(times);
			weatherResults = await getWeather(times, location, weatherResults, $language);
		} catch (error) {
			$preStatus = 'error';
			$preErrorText = error;
			return;
		}

		$preStatus = 'show';
		$preParsedWeather = parseWeather(times, weatherResults);
		incrementDailyCount();
	};

	// Form Validation

	// $: formIsValid =
	//     latlonInput.match(latlonRegex) &&
	//     date.match(dateRegex) &&
	//     startTime.match(startTimeRegex) &&
	//     typeof duration === 'number' &&
	//     duration >= 0;
	$: formIsValid =
		!$preFormErrors.latlon &&
		$preFormInput.latlon.length > 0 &&
		!$preFormErrors.date &&
		!$preFormErrors.startTime &&
		!$preFormErrors.duration &&
		$preFormInput.duration >= 0;

	function incrementDailyCount() {
		let count = parseInt($dailyCount);
		count += 1;
		$dailyCount = count.toString();
		console.log('$dailyCount: ', $dailyCount);
	}

	const inputKeyup = (event) => {
		if (event.key === 'Enter') {
			handleGetWeather();
		}
	};
</script>

<FormLocate />

<FormDate {currentDateTime} />

<FormStartTime {currentDateTime} />

<FormDuration />

<button class="preView-button button" type="submit" disabled={!formIsValid || $dailyCountError}
	>{$_('pre_submit.get_weather')}
</button>

<style>
	button[type='submit'] {
		margin: 1rem 0;
	}
</style>
