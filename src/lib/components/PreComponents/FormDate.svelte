<script>
	export let currentDateTime;

	import { preFormInput, preFormErrors } from '$lib/store';
	import { _ } from '$lib/services/i18n';
	import { validateDate } from '$lib/services/validation';

	if (!$preFormInput.date) {
		$preFormInput.date = currentDateTime.format('YYYY-MM-DD');
	}

	// Validation
	$: if (validateDate($preFormInput.date)) {
		$preFormErrors.date = false;
	}

	const dateFocusout = () => {
		if (!validateDate($preFormInput.date)) {
			$preFormErrors.date = true;
		}
	};
</script>

<div class="date-input full-width">
	<label for="date">{$_('pre_submit.date')}</label>
	<br />
	<input
		form="preGetWeather"
		type="date"
		name="date"
		id="date"
		bind:value={$preFormInput.date}
		on:focusout={dateFocusout}
		class:input-error={$preFormErrors.date}
	/>
	{#if $preFormErrors.date}
		<span class="error-message">{$_('pre_submit.date_error')}</span>
	{/if}
</div>
