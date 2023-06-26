<script>
	import { enhance } from '$app/forms';
	import { _ } from '$lib/services/i18n';
	import { get } from 'svelte/store';
	import {
		postStatus,
		postErrorText,
		postChecklistInfo,
		dailyCountError,
		language,
		postParsedWeather,
		dailyCount
	} from '$lib/store';

	import {
		getChecklistInfo,
		getTimezoneOffset,
		convertToUnixTime,
		getWeather,
		parseWeather
	} from '$lib/services/weatherFunctions';

	let checklistId = '';
	let checklistRegex = /S\d{7}\d*/;
	$: isChecklistId = checklistId.match(checklistRegex);

	$: {
		if ($language) {
			getWeatherHandler();
		} // if language changes, fetch new weather results in native language
	}

	function incrementDailyCount() {
		let count = parseInt($dailyCount);
		count += 1;
		$dailyCount = count.toString();
		console.log('$dailyCount: ', $dailyCount);
	}

	async function getWeatherHandler() {
		if (!isChecklistId || $dailyCountError) return; // if not valid checklist, or exceeded daily count limit, don't call any APIs

		// Weather Variables to be parsed into results store
		let weatherResults = {
			start: null,
			end: null
		};
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
		$postChecklistInfo = {};

		$postStatus = 'loading';

		// SERVER SIDE

		[$postChecklistInfo, times] = await getChecklistInfo(checklistId); // get checklistInfo and times from eBird

		if (checkEbirdErrors($postChecklistInfo, times)) return; // if eBird errors encountered, return

		try {
			times = await getTimezoneOffset(times, $postChecklistInfo);
			times = convertToUnixTime(times);
			weatherResults = await getWeather(
				times,
				get(postChecklistInfo),
				weatherResults,
				get(language)
			);
		} catch (error) {
			postStatus.set('error');
			postErrorText.set(error);
			return;
		}
		postStatus.set('show');
		postParsedWeather.set(parseWeather(times, weatherResults));
		incrementDailyCount();
	}

	// const inputKeyup = (event) => {
	// 	if (event.key === 'Enter' && isChecklistId) {
	// 		getWeatherHandler();
	// 	}
	// };
</script>

<form action="?/postGetWeather" method="POST" use:enhance class="full-width top-ui">
	<!-- <div class="full-width top-ui"> -->
	<label for="checklistId">{$_('submitted.checklist_id')}:</label><br />
	<input
		type="text"
		name="checklistId"
		id="checklistId"
		class="full-width"
		autocomplete="off"
		bind:value={checklistId}
		on:focus={() => (checklistId = '')}
		class:error={!isChecklistId && checklistId.length > 0}
	/>
	<!-- </div> -->
	<button
		type="submit"
		id="submitButton"
		disabled={!isChecklistId || $dailyCountError}
		class="button"
	>
		{$_('submitted.get_weather')}
	</button>
</form>

<!-- 
	INPUT
	on:keyup={(event) => inputKeyup(event)} 
-->

<style>
	.error {
		border: 1px solid red;
	}
</style>
