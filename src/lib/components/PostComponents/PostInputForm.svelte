<script>
	import { enhance, applyAction } from '$app/forms';
	import { _ } from '$lib/services/i18n';
	import {
		postStatus,
		postChecklistId,
		postChecklistInfo,
		postErrorText,
		dailyCountError,
		languageChange,
		postParsedWeather
	} from '$lib/store';
	import { validateChecklistId } from '$lib/services/validation';
	import { incrementDailyCount } from '$lib/services/incrementDailyCount';

	import { parseWeather } from '$lib/services/weather/parseWeather';
	$: isChecklistId = validateChecklistId($postChecklistId);

	// When language changes, resubmit form to get weather in correct language
	let submitButton;
	function clickSubmitButton() {
		// on initial view render, this function runs before the button is rendered
		if (submitButton) {
			submitButton.click();
		}
	}
	$: if ($languageChange) {
		clickSubmitButton(); // function used to prevent submitButton rendering to trigger reactive statement
	}

	const submitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		if (!isChecklistId || $dailyCountError) {
			console.log('Not calling API');
			cancel(); // if not valid checklist, or exceeded daily count limit, don't call any APIs
			return;
		}
		$postStatus = 'loading';

		return async ({ update, result }) => {
			if (result.type === 'failure') {
				$postStatus = 'error';
				if (result.data.type === 'checklistValidate') {
					$postErrorText = $_('submitted.invalid_checklist_id');
				} else {
					$postErrorText = $_('error.general_server_error');
				}
				console.error(result.data.type, '-', result.data.message);

				// restore input
				$postChecklistId = result.data.checklistId;
				return;
			}

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
