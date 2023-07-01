<script>
	export let data;

	import { browser } from '$app/environment';

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
	import {
		aboutView,
		optionsView,
		language,
		dailyCountError,
		viewingPost,
		options
	} from '$lib/store.js';
	import { languageChange } from '$lib/store.js';
	$: console.log('languageChange', $languageChange);

	// Other Functions
	const menuEsc = (event) => {
		if (event.key === 'Escape') {
			$optionsView = false;
			$aboutView = false;
		}
	};

	// Initialize language store with cookie data from load function
	if (!$language) {
		$language = data.lang;
	}

	// Update setupI18n and update lang cookie when language store changes
	$: {
		setupI18n({ withLocale: $language });
		if (browser) {
			document.cookie = `lang=${$language}; path=/; samesite=strict`;
			console.log('updated cookie');
		}
	}
	// Initialize options store with cookie data from load function
	if (!$options) {
		$options = JSON.parse(data.options);
	}
	// Update options cookie when options store changes
	$: if (browser) {
		document.cookie = `options=${JSON.stringify($options)}; path='/'; samesite=strict`;
	}
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

	<!-- TESTING MOCK API -->
	<!-- {#if form?.postWeather}
		<div>
			<h1>TEST AREA</h1>
			<h2>Post Weather</h2>
			<pre>{JSON.stringify(form.postWeather, null, 4)}</pre>
		</div>
	{/if} -->
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
