<script>
	export let isPost;

	import WeatherResults from '$lib/components/WeatherResults.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import DailyRequestPane from '$lib/components/DailyRequestPane.svelte';

	import { _ } from '$lib/services/i18n';
	import { dailyCountError, postStatus, postErrorText, preStatus, preErrorText } from '$lib/store';
</script>

<div class="full-width">
	{#if !$dailyCountError}
		<div
			class="weather-center weatherDisp"
			data-testid="weatherResultsPane"
			class:error-pane={isPost ? $postStatus === 'error' : $preStatus === 'error'}
		>
			<div>
				{#if isPost && $postStatus === 'init'}
					<p>{$_('submitted.help')}</p>
				{:else if !isPost && $preStatus === 'init'}
					<p>{$_('pre_submit.location_service_error')}</p>
				{:else if isPost ? $postStatus === 'loading' : $preStatus === 'loading'}
					<div class="loading-text">{$_('global_ui.loading')}</div>
				{:else if isPost ? $postStatus === 'error' : $preStatus === 'error'}
					{isPost ? $postErrorText : $preErrorText}
				{:else if isPost ? $postStatus === 'show' : $preStatus === 'show'}
					<WeatherResults {isPost} isPreview={false} />
				{/if}
			</div>
			{#if isPost ? $postStatus === 'show' : $preStatus === 'show'}
				<CopyButton {isPost} />
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
