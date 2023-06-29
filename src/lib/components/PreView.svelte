<script>
	// Components
	import WeatherDisplay from '$lib/components/WeatherDisplay.svelte';
	import DailyRequestPane from '$lib/components/DailyRequestPane.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import PreInputForm from '$lib/components/PreComponents/PreInputForm.svelte';

	// Stores
	import {
		preParsedWeather,
		preStatus,
		language,
		dailyCount,
		dailyCountError,
		preErrorText
	} from '$lib/store';

	// Services
	import { _ } from '$lib/services/i18n';
</script>

<div class="ui-container">
	<PreInputForm />

	<div class="full-width">
		{#if !$dailyCountError}
			<div class="weather-center weatherDisp" class:error-pane={$preStatus === 'error'}>
				<div>
					{#if $preStatus === 'init'}
						<!-- <p>Enter location, date, time, and duration and click "Get Weather"</p> -->
						<!-- <br> -->
						<p>{$_('pre_submit.location_service_error')}</p>
					{:else if $preStatus === 'loading'}
						{$_('global_ui.loading')}
					{:else if $preStatus === 'error'}
						{$preErrorText}
					{:else if $preStatus === 'show'}
						<WeatherDisplay isPost={false} isPreview={false} />
					{/if}
				</div>
				{#if $preStatus === 'show'}
					<CopyButton view="pre" />
				{/if}
			</div>
		{:else}
			<DailyRequestPane />
		{/if}
	</div>
</div>

<style>
	.ui-container {
		grid-template-rows: repeat(7, auto) 1fr;
	}
</style>
