<script>
	import WeatherResults from '$lib/components/WeatherResults.svelte';
	import OptionsList from '$lib/components/OptionsList.svelte';
	import ResultsPane from '$lib/components/ResultsPane.svelte';

	import { postStatus, preStatus, optionsView, viewingPost, dailyCountError } from '$lib/store';
	import { _ } from '$lib/services/i18n';
</script>

<div class="menu-container options-container">
	<div class="options-scroll">
		{#if $viewingPost && !$dailyCountError}
			{#if $postStatus === 'show' || $postStatus === 'loading'}
				<WeatherResults isPreview={true} isPost={true} />
			{/if}
		{:else if !$viewingPost}
			{#if $preStatus === 'show' || $preStatus === 'loading'}
				<WeatherResults isPreview={true} isPost={false} />
			{/if}
		{/if}

		<OptionsList />
	</div>

	<div class="options-bottom">
		<button on:click={() => ($optionsView = !$optionsView)} class="done-button button"
			>{$_('global_ui.done').toUpperCase()}</button
		>
	</div>
</div>

<style>
	.options-container {
		width: 450px;
		justify-items: center;
	}

	.options-scroll {
		overflow: scroll;
		padding-inline: 1rem;
		width: 100%;
	}

	.done-button {
		width: 200px;
	}
</style>
