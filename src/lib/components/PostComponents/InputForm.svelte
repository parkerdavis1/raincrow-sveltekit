<script>
	import { _ } from '$lib/services/i18n';
	import dayjs from 'dayjs';
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

	function checkEbirdErrors(checklistInfo, times) {
		// eBird Error Handling
		if (checklistInfo.ok === false) {
			$postErrorText = $_('invalid_checklist_id');
			$postStatus = 'error';
			return true;
		}

		// Historical Checklists Error
		if (checklistInfo.obsTimeValid === false) {
			$postStatus = 'error';
			$postErrorText = $_('submitted.historical_checklist_error');
			return true;
		}
		if (dayjs(times.start.localTime).get('year') < 1979) {
			$postStatus = 'error';
			$postErrorText = $_('submitted.too_old_checklist_error');
			return true;
		}
	}

	async function getWeatherHandler() {
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

		if (!isChecklistId || $dailyCountError) return; // if not valid checklist, or exceeded daily count limit, don't call any APIs

		postStatus.set('loading');

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

	const inputKeyup = (event) => {
		if (event.key === 'Enter' && isChecklistId) {
			getWeatherHandler();
		}
	};
</script>

<div id="checklistInputForm" class="full-width top-ui">
	<label for="checklistID">{$_('submitted.checklist_id')}:</label><br />
	<input
		type="text"
		name="checklistID"
		id="checklistID"
		class="full-width"
		bind:value={checklistId}
		on:keyup={(event) => inputKeyup(event)}
		on:focus={() => (checklistId = '')}
		class:error={!isChecklistId && checklistId.length > 0}
	/>
</div>
<button
	id="submitButton"
	on:click={getWeatherHandler}
	disabled={!isChecklistId || $dailyCountError}
	class="button"
>
	{$_('submitted.get_weather')}
</button>

<style>
	.error {
		border: 1px solid red;
	}
</style>
