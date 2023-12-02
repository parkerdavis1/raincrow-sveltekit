<script>
	export let isPost;

	import WeatherResults from '$lib/components/WeatherResults.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import DailyRequestPane from '$lib/components/DailyRequestPane.svelte';

	import { _ } from '$lib/services/i18n';
	import { dailyCountError, postStatus, postErrorText, preStatus, preErrorText } from '$lib/store';
</script>

<div class="full-width">
	{#if isPost}
		<div
			class="weather-center weatherDisp"
			data-testid="weatherResultsPane"
			class:error-pane={$postStatus === 'error' || ($postStatus === 'init' && $dailyCountError)}
		>
			<div>
				{#if $postStatus === 'init' && $dailyCountError}
					<DailyRequestPane />
				{:else if $postStatus === 'init'}
					<p>{$_('submitted.help')}</p>
				{:else if $postStatus === 'loading'}
					<p class="loading-text">{$_('global_ui.loading')}</p>
				{:else if $postStatus === 'error'}
					<p>{$postErrorText}</p>
				{:else if $postStatus === 'show'}
					<WeatherResults {isPost} isPreview={false} />
				{/if}
			</div>
			{#if $postStatus === 'show'}
				<CopyButton {isPost} />
			{/if}
		</div>
	{:else}
		<div
			class="weather-center weatherDisp"
			data-testid="weatherResultsPane"
			class:error-pane={$preStatus === 'error' || ($preStatus === 'init' && $dailyCountError)}
		>
			<div>
				{#if $preStatus === 'init' && $dailyCountError}
					<DailyRequestPane />
				{:else if $preStatus === 'init'}
					<p>{$_('submitted.help')}</p>
				{:else if $preStatus === 'loading'}
					<p class="loading-text">{$_('global_ui.loading')}</p>
				{:else if $preStatus === 'error'}
					<p>{$preErrorText}</p>
				{:else if $preStatus === 'show'}
					<WeatherResults {isPost} isPreview={false} />
				{/if}
			</div>
			{#if $preStatus === 'show'}
				<CopyButton {isPost} />
			{/if}
		</div>
	{/if}
</div>

<style>
	.loading-text {
		transform: rotate(0);
	}
</style>
