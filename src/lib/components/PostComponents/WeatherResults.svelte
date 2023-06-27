<script>
	import { dailyCountError, postStatus, postErrorText } from '$lib/store';

	import WeatherDisplay from '$lib/components/WeatherDisplay.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import DailyRequestPane from '$lib/components/DailyRequestPane.svelte';

	import { _ } from '$lib/services/i18n';
</script>

<div class="full-width">
	{#if !$dailyCountError}
		<div
			class="weather-center weatherDisp"
			data-testid="weatherResultsPane"
			class:error-pane={$postStatus === 'error'}
		>
			<div>
				{#if $postStatus === 'init'}
					<p>{$_('submitted.help')}</p>
				{:else if $postStatus === 'loading'}
					<div class="loading-text">{$_('global_ui.loading')}</div>
				{:else if $postStatus === 'error'}
					{$postErrorText}
				{:else if $postStatus === 'show'}
					<WeatherDisplay isPost={true} isPreview={false} />
				{/if}
			</div>
			{#if $postStatus === 'show'}
				<CopyButton view="post" />
			{/if}
		</div>
	{:else}
		<DailyRequestPane />
	{/if}
</div>

<style>
	.loading-text {
		transform: rotate(0);
	}
</style>
