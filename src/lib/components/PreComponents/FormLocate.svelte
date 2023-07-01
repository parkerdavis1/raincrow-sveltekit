<script>
	import { _ } from '$lib/services/i18n';
	import { preFormInput, preFormValidationErrors, preStatus } from '$lib/store';
	import { validateLatlon } from '$lib/services/validation';

	// Validation
	$: if (validateLatlon($preFormInput.latlon)) {
		$preFormValidationErrors.latlon = false;
	}

	$: if ($preStatus === 'loading' || $preStatus === 'show') {
		locateError.error = false;
	}

	let locateError = {
		error: false,
		code: 0,
		message: ''
	};
	let disableLocateButton = false;

	const latlonFocusout = () => {
		if (!validateLatlon($preFormInput.latlon)) {
			$preFormValidationErrors.latlon = true;
		}
	};

	// GEOLOCATION
	const handleLocate = async () => {
		locateError.error = false;
		const options = {
			enableHighAccuracy: false,
			timeout: 10000,
			maximumAge: 1800000
		};
		const error = (error) => {
			if (error.code === 0) return; // ignore kCLErrorDomain error 0
			locateError = {
				error: true,
				code: error.code,
				message: error.message
			};
			disableLocateButton = true;
			console.warn(`ERROR (${error.code}): ${error.message}`);
			setTimeout(() => {
				disableLocateButton = false;
			}, 4000);
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
		id="latlon"
		bind:value={$preFormInput.latlon}
		on:focusout={latlonFocusout}
		class:input-error={$preFormValidationErrors.latlon}
	/>
	{#if $preFormValidationErrors.latlon}
		<span class="error-message">{$_('pre_submit.coordinates_error')}</span>
	{/if}
</div>

<button class="preView-button locate button" disabled={disableLocateButton} on:click={handleLocate}>
	{$_('pre_submit.locate')}
</button>
{#if locateError.error}
	<span class="locate-error">
		{#if locateError.code === 1}{$_('pre_submit.locate_error')} {/if}({locateError.message})
	</span>
{/if}

<style>
	.locate-error {
		display: block;
		grid-column: content-start / content-end;
		text-align: center;
		font-size: small;
		color: var(--error-text);
	}
</style>
