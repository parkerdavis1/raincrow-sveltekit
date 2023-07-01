<script>
	import { _ } from '../services/i18n';
	import openweatherLogo from '$lib/assets/openweatherlogo-light.jpg';
</script>

<h2>{$_('about.welcome')}! &#x1F326;</h2>
<p class="attr">
	{$_('about.created_by')} <a href="https://parkerdavis.dev/" target="_blank">Parker Davis</a>
</p>
<p>{@html $_('about.app_purpose')}</p>
<section>
	<h3>{$_('about.submitted.title')}</h3>
	<p>{@html $_('about.submitted.text')}</p>
</section>
<section>
	<h3>{$_('about.pre_submit.title')}</h3>
	<p>{$_('about.pre_submit.text')}</p>
	<details>
		<summary>{@html $_('about.pre_submit.troubleshoot_title')}</summary>
		<ul>
			<li>{$_('about.pre_submit.enable_location_service')}</li>
			<li>{$_('about.pre_submit.allow_location_access')}</li>
			<li>{@html $_('about.pre_submit.toggle_location_preference')}</li>
			<li>{@html $_('about.pre_submit.iphone_users')}</li>
		</ul>
	</details>
</section>
<section>
	<h3>{$_('about.options.title')}</h3>
	<p>{$_('about.options.text')}</p>
	<p>{@html $_('about.options.icon_and_links')}</p>
</section>
<section>
	<h3>{$_('about.weather_data.title')}</h3>
	<img src={openweatherLogo} alt="OpenWeather Logo" loading="lazy" />
	<p>{@html $_('about.weather_data.provided_by')}</p>
	<p>{$_('about.weather_data.range_format')}</p>
	<p>{$_('about.weather_data.limitations')}</p>
</section>
<section>
	<h3>{$_('about.languages.title')}</h3>
	<p>{@html $_('about.languages.text')}</p>
</section>
<section>
	<h3>{$_('about.daily_limits.title')}</h3>
	<p>{$_('about.daily_limits.text')}</p>
	<details>
		<summary><strong>{$_('about.error_429.title')}</strong></summary>
		<p>{$_('about.error_429.text')}</p>
	</details>
</section>
<section>
	<p>{@html $_('about.email_me')}</p>
</section>

<style>
	section {
		margin-top: 2rem;
	}

	section p:first-of-type {
		margin-top: 0;
	}

	p,
	details {
		margin-top: 1rem;
	}

	.attr {
		margin-top: 0;
		font-size: 0.8rem;
	}

	summary {
		cursor: pointer;
	}

	/* these are for buttons and highlights in the text, the HTML is in i18n objects so they require :global */
	:global(span.highlight),
	:global(span.copy) {
		color: var(--button-text-color);
		padding: 3px 6px;
		border-radius: 5px;
		white-space: nowrap;
	}

	:global(span.highlight) {
		/* background: #409100; */
		background: var(--green-button-bg);
	}

	:global(span.copy) {
		background: var(--copy-button-bg);
	}
</style>
