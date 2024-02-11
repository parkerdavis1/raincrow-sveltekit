<script>
	import { enhance, applyAction } from '$app/forms';
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
		dailyCountError,
		languageChange,
		preParsedWeather,
		preErrorText,
		preFormInput,
		preFormValidationErrors
	} from '$lib/store';

	// Date Time
	const currentDateTime = dayjs();

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

	// Submit & Error Handling
	const submitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		// check for errors
		if (!formIsValid || $dailyCountError) {
			cancel();
			return;
		}

		$preStatus = 'loading';

		return async ({ update, result }) => {
			if (result.type === 'failure') {
				// render error text
				if (
					result.data.type === 'timezoneOffsetError' ||
					result.data.type === 'GetWeatherForStartAndEnd error'
				) {
					$preErrorText = result.data.message;
				} else {
					$preErrorText = $_('error.general_server_error');
				}

				$preStatus = 'error';
				if (result.data.errors?.length > 0) {
					result.data.errors.forEach((error) => {
						$preFormValidationErrors[error] = true;
					});
				}
				console.error(result.data.type, '-', result.data.message);

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
		!$preFormValidationErrors.latlon &&
		$preFormInput.latlon.length > 0 &&
		!$preFormValidationErrors.date &&
		!$preFormValidationErrors.startTime &&
		!$preFormValidationErrors.duration &&
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
