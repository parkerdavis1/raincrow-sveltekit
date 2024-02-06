<script>
	import '$lib/styles/app.css';
	import '$lib/styles/reset.css';
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<title>RainCrow | eBird weather</title>
	<meta name="description" content="Weather for any eBird checklist" />
	<link rel="canonical" href="https://raincrow.app" />
	<meta name="robots" content="index, follow" />
	<meta property="og:title" content="RainCrow | eBird Weather" />
	<meta property="og:url" content="https://raincrow.app" />
	<meta property="og:description" content="Weather for any eBird checklist" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:description" content="Weather for any eBird checklist" />
	<meta name="twitter:title" content="RainCrow | eBird Weather" />

	<!-- <meta property="og:image" content="https://raincrow.netlify.app/raincrow.jpg" />
	<meta name="twitter:image" content="https://raincrow.netlify.app/raincrow.jpg" />
	<link rel="apple-touch-icon" href="https://raincrow.netlify.app/raincrow-apple-touch.jpg" /> -->
	<meta property="og:image" content="raincrow.jpg" />
	<meta name="twitter:image" content="raincrow.jpg" />
	<!-- <link rel="apple-touch-icon" href="raincrow-apple-touch.jpg" /> -->

	<link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png" />
	<link rel="manifest" href="site.webmanifest" />
	<link rel="mask-icon" href="icons/safari-pinned-tab.svg" color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />
	<script
		defer
		data-domain="raincrow.app"
		src="https://plausible.parkerdavis.dev/js/script.js"
	></script>
</svelte:head>

<div id="app">
	<slot />
</div>
