<script>
	import '$lib/styles/app.css';
	import '$lib/styles/reset.css';
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<title>RainCrow | eBird weather</title>
	<meta name="description" content="Weather for any eBird checklist" />
	<link rel="canonical" href="https://raincrow.netlify.app" />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="RainCrow | eBird Weather" />
	<meta property="og:url" content="https://raincrow.netlify.app" />
	<meta property="og:description" content="Weather for any eBird checklist" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:description" content="Weather for any eBird checklist" />
	<meta name="twitter:title" content="RainCrow | eBird Weather" />

	<!-- <meta property="og:image" content="https://raincrow.netlify.app/raincrow.jpg" />
	<meta name="twitter:image" content="https://raincrow.netlify.app/raincrow.jpg" />
	<link rel="apple-touch-icon" href="https://raincrow.netlify.app/raincrow-apple-touch.jpg" /> -->
	<meta property="og:image" content="/raincrow.jpg" />
	<meta name="twitter:image" content="/raincrow.jpg" />
	<link rel="apple-touch-icon" href="/raincrow-apple-touch.jpg" />
</svelte:head>

<div id="app">
	<slot />
</div>
