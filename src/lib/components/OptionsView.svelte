<script>
	import WeatherResults from '$lib/components/WeatherResults.svelte';
	import OptionsList from '$lib/components/OptionsList.svelte';

	import { postStatus, preStatus, optionsView, viewingPost } from '$lib/store';
	import { _ } from '$lib/services/i18n';
</script>

<div class="options-container">
	<div class="options-scroll">
		{#if $viewingPost}
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
		background-color: var(--background-color);
		position: fixed;
		width: 400px;
		max-width: 95%;
		max-height: 95vh;

		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 1px var(--border-color) solid;
		padding: 1rem;

		display: grid;
		grid-template-rows: 1fr auto;
		grid-template-columns: 1fr;
		justify-items: center;
		/* overflow: scroll; */
	}

	.options-scroll {
		overflow: scroll;
	}

	.done-button {
		width: 200px;
	}
</style>
