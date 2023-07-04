<script>
	// export let data;

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

	// ---- LANGUAGE ----

	// Get browser's preferred language
	function getBrowserLanguage() {
		let browserLanguage = window.navigator.language.slice(0, 2) ?? '';
		if (browserLanguage === 'fr' || browserLanguage === 'es') {
			return browserLanguage;
		} else return 'en';
	}

	// if language store is not initialized, use the browser's preferred language
	if (!$language) {
		if (browser) {
			$language = getBrowserLanguage();
		}
	}

	// Update setupI18n and update lang cookie when language store changes
	$: {
		setupI18n({ withLocale: $language });
		if (browser) {
			document.cookie = `lang=${$language}; path=/; samesite=strict`;
		}
	}

	// ---- Other Functions ----
	const menuEsc = (event) => {
		if (event.key === 'Escape') {
			$optionsView = false;
			$aboutView = false;
		}
	};
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
		height: 100vh;
		height: 100svh;
		width: 100%;
		display: grid;
		grid-template-rows: auto auto 1fr auto auto;
	}

	.blur {
		filter: blur(10px);
		transition: filter 500ms;
		pointer-events: none;
		overflow: hidden;
	}
</style>
