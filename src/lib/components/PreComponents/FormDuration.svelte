<script>
	import { _ } from '$lib/services/i18n';
	import { preFormInput, preFormErrors } from '$lib/store';
	import { validateDuration } from '$lib/services/validation';

	$: if (validateDuration($preFormInput.duration)) {
		$preFormErrors.duration = false;
	}

	const durationFocusout = () => {
		if (!validateDuration($preFormInput.duration)) {
			$preFormErrors.duration = true;
		}
	};
</script>

<div class="right">
	<label for="duration"
		>{$_('pre_submit.duration')}
		<small>({$_('pre_submit.minutes')})</small></label
	>
	<br />
	<input
		form="preGetWeather"
		type="number"
		name="duration"
		id="duration"
		min="0"
		bind:value={$preFormInput.duration}
		on:focusout={durationFocusout}
		class:input-error={$preFormErrors.duration}
	/>
	{#if $preFormErrors.duration}
		<span class="error-message">{$_('pre_submit.duration_error')}</span>
	{/if}
</div>

<style>
	.right {
		grid-column: center-line / content-end;
	}
</style>
