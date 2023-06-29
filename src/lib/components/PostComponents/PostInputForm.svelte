<script>
	import { enhance, applyAction } from '$app/forms';
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { _ } from '$lib/services/i18n';
	import {
		postStatus,
		postChecklistId,
		postChecklistInfo,
		postErrorText,
		dailyCountError,
		language,
		languageChange,
		postParsedWeather,
		dailyCount
	} from '$lib/store';
	import { validateChecklistId } from '$lib/services/validation';

	import { parseWeather } from '$lib/services/weather/parseWeather';
	$: isChecklistId = validateChecklistId($postChecklistId);

	function incrementDailyCount() {
		if (!dev) {
			let count = parseInt($dailyCount);
			count += 1;
			$dailyCount = count.toString();
			console.log('$dailyCount: ', $dailyCount);
		}
	}

	// When language changes, resubmit form to get weather in correct language
	let submitButton;
	$: if ($languageChange) {
		console.log('language change');
		if (submitButton) {
			submitButton.click();
		}
	}

	const submitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		if (!isChecklistId || $dailyCountError) {
			cancel(); // if not valid checklist, or exceeded daily count limit, don't call any APIs
			return;
		}
		$postStatus = 'loading';

		return async ({ update, result }) => {
			if (result.type === 'failure') {
				console.log('inside failure if statement');
				$postStatus = 'error';
				if (result.data.type === 'checklistValidate') {
					$postErrorText = $_('submitted.invalid_checklist_id');
				} else {
					$postErrorText = $_(result.data.message);
				}
				// return input
				$postChecklistId = result.data.checklistId;
				return;
			}

			$postParsedWeather = parseWeather(result.data.postWeather); // timezone offset?
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
		bind:value={$postChecklistId}
		class:input-error={!isChecklistId && $postChecklistId.length > 0}
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
