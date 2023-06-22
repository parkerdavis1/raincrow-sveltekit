<script>
	// Components
	import PostView from '$lib/components/PostView.svelte';
	import PreView from '$lib/components/PreView.svelte';
	import AboutView from '$lib/components/AboutView.svelte';
	import DailyRequestPane from '$lib/components/DailyRequestPane.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import OptionsView from '$lib/components/OptionsView.svelte';

	// Helpers
	import { _, setupI18n } from '$lib/services/i18n';

	// Stores
	import { aboutView, optionsView, language, dailyCountError, viewingPost } from '$lib/store.js';

	// Other Functions
	const menuEsc = (event) => {
		if (event.key === 'Escape') {
			$optionsView = false;
			$aboutView = false;
		}
	};

	$: setupI18n({ withLocale: $language });
</script>

<!-- --------START OF APP-------- -->

<svelte:window on:keydown={menuEsc} />

<div class="vertical-grid-container" class:blur={$optionsView || $aboutView}>
	<Header />

	{#if $viewingPost}
		<PostView />
	{:else}
		<PreView />
	{/if}

	{#if !$dailyCountError}
		<DailyRequestPane />
	{/if}

	<Footer />
</div>

<!-- --------ABOUT MENU-------- -->

{#if $aboutView}
	<AboutView />
{/if}

<!-- --------OPTIONS MENU-------- -->
{#if $optionsView}
	<OptionsView />
{/if}

<!-- --------STYLE-------- -->
<style>
	.vertical-grid-container {
		height: 90vh;
		width: 100%;
		display: grid;
		grid-template-rows: auto auto 1fr auto auto;
	}

	.blur {
		filter: blur(10px);
		transition: filter 500ms;
		pointer-events: none;
	}
</style>
