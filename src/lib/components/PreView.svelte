<script>
	// Components
	import WeatherResults from '$lib/components/WeatherResults.svelte';
	import DailyRequestPane from '$lib/components/DailyRequestPane.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import PreInputForm from '$lib/components/PreComponents/PreInputForm.svelte';
	import ResultsPane from '$lib/components/ResultsPane.svelte';

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
	<ResultsPane isPost={false} />
</div>

<style>
	.ui-container {
		grid-template-rows: repeat(7, auto) 1fr;
	}
</style>
