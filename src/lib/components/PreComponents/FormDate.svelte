<script>
	export let currentDateTime;

	import { preFormInput, preFormErrors } from '$lib/store';
	import { _ } from '$lib/services/i18n';

	$preFormInput.date = currentDateTime.format('YYYY-MM-DD');

	const dateFocusout = () => {
		if (!$preFormInput.date.match(dateRegex)) {
			$preFormErrors.date = true;
		}
	};

	// Validation
	const dateRegex = /\d{4}-\d{1,2}-\d{1,2}/;
	$: if (!$preFormInput.date.match(dateRegex) && $preFormInput.date.length > 0) {
		$preFormErrors.date = false;
	}
</script>

<div class="date-input full-width">
	<label for="date">{$_('pre_submit.date')}</label>
	<br />
	<input
		type="date"
		name="date"
		id="date"
		bind:value={$preFormInput.date}
		on:focusout={dateFocusout}
		class:error={$preFormErrors.date}
	/>
	{#if $preFormErrors.date}
		<span class="error-message">{$_('pre_submit.date_error')}</span>
	{/if}
</div>
