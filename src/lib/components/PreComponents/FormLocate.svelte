<script>
	import { _ } from '$lib/services/i18n';
	import { preFormInput, preFormErrors } from '$lib/store';
	import { validateLatlon } from '$lib/services/validation';

	// let locateButtonText = $_('pre_submit.locate');
	let locateError = false;

	// Validation
	$: if (validateLatlon($preFormInput.latlon)) {
		$preFormErrors.latlon = false;
	}

	const latlonFocusout = () => {
		if (!validateLatlon($preFormInput.latlon)) {
			$preFormErrors.latlon = true;
		}
	};

	// GEOLOCATION
	const handleLocate = async (event) => {
		event.preventDefault();
		const options = {
			enableHighAccuracy: false,
			timeout: 3000,
			maximumAge: 1800000
		};
		const error = (error) => {
			// locateButtonText = $_('pre_submit.locate_error', {
			// 	values: { errorCode: error.code, errorMessage: error.message }
			// });
			locateError = true;
			console.warn(`ERROR(${error.code}): ${error.message}`);
		};
		const success = (position) => {
			console.log(position.coords);
			$preFormInput.latlon = `${position.coords.latitude},${position.coords.longitude}`;
		};
		await navigator.geolocation.getCurrentPosition(success, error, options);
	};
</script>

<div class="full-width top-ui">
	<label for="latlon">
		{$_('pre_submit.location')}
		<small>
			({$_('pre_submit.latitude')}, {$_('pre_submit.longitude')})
		</small>
	</label>
	<br />
	<input
		form="preGetWeather"
		type="text"
		name="latlon"
		bind:value={$preFormInput.latlon}
		on:focusout={latlonFocusout}
		class:input-error={$preFormErrors.latlon}
	/>
	{#if $preFormErrors.latlon}
		<span class="error-message">{$_('pre_submit.coordinates_error')}</span>
	{/if}
</div>

<button class="preView-button locate button" on:click={handleLocate}>
	{#if locateError}
		{$_('pre_submit.locate_error')}
	{:else}
		{$_('pre_submit.locate')}
	{/if}
</button>
