<script>
	import { enhance, applyAction } from '$app/forms';
	import { dev } from '$app/environment';
	import { _ } from '$lib/services/i18n';
	import {
		postStatus,
		postChecklistInfo,
		dailyCountError,
		language,
		postParsedWeather,
		dailyCount
	} from '$lib/store';

	import { parseWeather } from '$lib/services/weather/parseWeather';
	import { onMount } from 'svelte';

	let checklistId = '';
	let checklistRegex = /S\d{7}\d*/;
	$: isChecklistId = checklistId.match(checklistRegex);

	function incrementDailyCount() {
		if (!dev) {
			let count = parseInt($dailyCount);
			count += 1;
			$dailyCount = count.toString();
			console.log('$dailyCount: ', $dailyCount);
		}
	}

	let submitButton;
	let ready = false;
	onMount(() => {
		ready = true;
	});
	$: {
		if ($language && ready) {
			submitButton.click();
		}
	}

	const submitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		if (!isChecklistId || $dailyCountError) {
			console.log('CANCELLING!');
			cancel(); // if not valid checklist, or exceeded daily count limit, don't call any APIs
			return;
		}
		$postStatus = 'loading';

		return async ({ update, result }) => {
			$postParsedWeather = parseWeather(result.data.postWeather);
			$postChecklistInfo = result.data.postWeather.checklistInfo;
			$postStatus = 'show';
			incrementDailyCount();
			await applyAction(result);
		};
	};
</script>

<form
	action="?/postGetWeather"
	method="POST"
	id="postGetWeather"
	class="full-width top-ui"
	use:enhance={submitFunction}
>
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
</form>
<button
	bind:this={submitButton}
	type="submit"
	id="submitButton"
	disabled={!isChecklistId || $dailyCountError || $postStatus === 'loading'}
	class="button"
	form="postGetWeather"
>
	{$_('submitted.get_weather')}
</button>

<style>
	.error {
		border: 1px solid red;
	}
</style>
