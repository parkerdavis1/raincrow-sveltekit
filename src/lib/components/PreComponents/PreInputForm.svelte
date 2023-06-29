<script>
	import { enhance, applyAction } from '$app/forms';
	import { onMount } from 'svelte';
	import { _ } from '$lib/services/i18n';
	import dayjs from '$lib/services/dayjsExtended';
	import { parseWeather } from '$lib/services/weather/parseWeather';
	import { incrementDailyCount } from '$lib/services/incrementDailyCount';

	// Components
	import FormLocate from '$lib/components/PreComponents/FormLocate.svelte';
	import FormDate from '$lib/components/PreComponents/FormDate.svelte';
	import FormStartTime from '$lib/components/PreComponents/FormStartTime.svelte';
	import FormDuration from '$lib/components/PreComponents/FormDuration.svelte';

	// Stores
	import {
		preStatus,
		dailyCount,
		dailyCountError,
		language,
		languageChange,
		preParsedWeather,
		preErrorText,
		preFormInput,
		preFormErrors
	} from '$lib/store';

	// Date Time
	const currentDateTime = dayjs();

	// When language changes, resubmit form to get weather in correct language
	let submitButton;
	$: if ($languageChange) {
		console.log('language change');
		if (submitButton) {
			submitButton.click();
		}
	}

	// Submit & Error Handling
	const submitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		// check for errors
		if (!formIsValid || $dailyCountError) {
			console.log('CANCELLING!');
			cancel();
			return;
		}

		$preStatus = 'loading';

		return async ({ update, result }) => {
			if (result.type === 'failure') {
				$preStatus = 'error';
				// render error text
				$preErrorText = 'Server error: check ';
				result.data.errors.forEach((error) => {
					$preFormErrors[error] = true;
					$preErrorText += error + ', ';
				});
				$preErrorText = $preErrorText.slice(0, $preErrorText.length - 2);

				// restore inputs
				$preFormInput = {
					...$preFormInput,
					latlon: result.data.latlon,
					date: result.data.date,
					startTime: result.data.startTime,
					duration: result.data.duration
				};
				return;
			}

			$preParsedWeather = parseWeather(result.data.preWeather);
			$preStatus = 'show';
			incrementDailyCount();
			await applyAction(result);
		};
	};

	// Form Validation
	$: formIsValid =
		!$preFormErrors.latlon &&
		$preFormInput.latlon.length > 0 &&
		!$preFormErrors.date &&
		!$preFormErrors.startTime &&
		!$preFormErrors.duration &&
		$preFormInput.duration >= 0;
</script>

<form action="?/preGetWeather" method="POST" id="preGetWeather" use:enhance={submitFunction} />
<FormLocate />

<FormDate {currentDateTime} />

<FormStartTime {currentDateTime} />

<FormDuration />

<button
	bind:this={submitButton}
	class="preView-button button"
	type="submit"
	form="preGetWeather"
	disabled={!formIsValid || $dailyCountError}
	>{$_('pre_submit.get_weather')}
</button>

<style>
	button[type='submit'] {
		margin: 1rem 0;
	}
</style>
