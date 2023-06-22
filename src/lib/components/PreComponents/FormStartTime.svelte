<script>
	export let currentDateTime;

	import { _ } from '$lib/services/i18n';
	import { preFormInput, preFormErrors } from '$lib/store';

	$preFormInput.startTime = currentDateTime.startOf('hour').format('HH:mm');

	const startTimeRegex = /\d{1,2}:\d{2}$/;
	// Validation
	$: if (!$preFormInput.startTime.match(startTimeRegex) && $preFormInput.startTime.length > 0) {
		$preFormErrors.startTime = false;
	}

	const startTimeFocusout = () => {
		if (!$preFormInput.startTime.match(startTimeRegex)) {
			$preFormErrors.startTime = true;
		}
	};
</script>

<div class="left">
	<label for="startTime">{$_('pre_submit.start_time')}</label>
	<br />
	<input
		type="time"
		name="startTime"
		id="startTime"
		bind:value={$preFormInput.startTime}
		on:focusout={startTimeFocusout}
		class:error={$preFormErrors.startTime}
	/>
	{#if $preFormErrors.startTime}
		<span class="error-message">{$_('pre_submit.start_time_error')}</span>
	{/if}
</div>

<style>
	.left {
		grid-column: content-start / center-line;
	}
</style>
