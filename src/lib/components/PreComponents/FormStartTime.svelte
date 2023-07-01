<script>
	export let currentDateTime;

	import { _ } from '$lib/services/i18n';
	import { preFormInput, preFormValidationErrors } from '$lib/store';
	import { validateStartTime } from '$lib/services/validation';

	if (!$preFormInput.startTime) {
		$preFormInput.startTime = currentDateTime.startOf('hour').format('HH:mm');
	}

	// Validation
	$: if (validateStartTime($preFormInput.startTime)) {
		$preFormValidationErrors.startTime = false;
	}

	const startTimeFocusout = () => {
		if (!validateStartTime($preFormInput.startTime)) {
			$preFormValidationErrors.startTime = true;
		}
	};
</script>

<div class="left">
	<label for="startTime">{$_('pre_submit.start_time')}</label>
	<br />
	<input
		form="preGetWeather"
		type="time"
		name="startTime"
		id="startTime"
		bind:value={$preFormInput.startTime}
		on:focusout={startTimeFocusout}
		class:input-error={$preFormValidationErrors.startTime}
	/>
	{#if $preFormValidationErrors.startTime}
		<span class="error-message">{$_('pre_submit.start_time_error')}</span>
	{/if}
</div>

<style>
	.left {
		grid-column: content-start / center-line;
	}
</style>
