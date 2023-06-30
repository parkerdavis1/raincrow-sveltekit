<script>
	export let isPreview;
	export let isPost;
	import { postParsedWeather, preParsedWeather, options, postStatus, preStatus } from '$lib/store';
	import { _ } from '$lib/services/i18n';
</script>

<div class="weatherDisp-container">
	<div
		class="weatherDisp"
		class:results-preview={isPreview}
		class:blur={($postStatus === 'loading' && isPost === true) ||
			($preStatus === 'loading' && isPost === false)}
	>
		{#if isPreview}<h3>Preview:</h3>{/if}

		{#if $options.icon}
			{#if isPost}
				{#if $options.iconType === 'open'}
					{@html $postParsedWeather.icon.open}
				{:else if $options.iconType === 'emoji'}
					<p>
						{$postParsedWeather.icon.emoji}
					</p>
				{/if}
			{:else if $options.iconType === 'open'}
				{@html $preParsedWeather.icon.open}
			{:else if $options.iconType === 'emoji'}
				<p>
					{$preParsedWeather.icon.emoji}
				</p>
			{/if}
		{/if}

		{#if $options.conditions}
			<p>
				{#if isPost}
					{$postParsedWeather.conditions}
				{:else}
					{$preParsedWeather.conditions}
				{/if}
			</p>
		{/if}

		{#if $options.temperature}
			<p>
				{$_('weather.temperature')}:
				{#if isPost}
					{$options.temperatureUnit === 'c'
						? $postParsedWeather.temperature.c
						: $postParsedWeather.temperature.f}
				{:else}
					{$options.temperatureUnit === 'c'
						? $preParsedWeather.temperature.c
						: $preParsedWeather.temperature.f}
				{/if}
			</p>
		{/if}

		{#if $options.windspeed}
			<p>
				{$_('weather.wind')}:
				{#if isPost}
					{#if $options.windUnit === 'description'}
						{$postParsedWeather.windspeed.description}
					{:else if $options.windUnit === 'beaufort'}
						Beaufort force {$postParsedWeather.windspeed.beaufort}
					{:else if $options.windUnit === 'mph'}
						{$postParsedWeather.windspeed.mph}
					{:else if $options.windUnit === 'kmh'}
						{$postParsedWeather.windspeed.kmh}
					{:else if $options.windUnit === 'ms'}
						{$postParsedWeather.windspeed.ms}
					{/if}
					<!--
			  {#if $options.windDirection}
				{#if $options.windDirectionType === 'arrow'}
				  {$postParsedWeather.windDirection.arrow}
				{:else if $options.windDirectionType === 'text'}
				  {$postParsedWeather.windDirection.text}
				{/if}
			  {/if} -->
				{:else}
					{#if $options.windUnit === 'description'}
						{$preParsedWeather.windspeed.description}
					{:else if $options.windUnit === 'beaufort'}
						Beaufort force {$preParsedWeather.windspeed.beaufort}
					{:else if $options.windUnit === 'mph'}
						{$preParsedWeather.windspeed.mph}
					{:else if $options.windUnit === 'kmh'}
						{$preParsedWeather.windspeed.kmh}
					{:else if $options.windUnit === 'ms'}
						{$preParsedWeather.windspeed.ms}
					{/if}

					<!-- {#if $options.windDirection}
				{#if $options.windDirectionType === 'arrow'}
				  {$preParsedWeather.windDirection.arrow}
				{:else if $options.windDirectionType === 'text'}
				  {$preParsedWeather.windDirection.text}
				{/if}
			  {/if} -->
				{/if}
			</p>
		{/if}

		{#if $options.windDirection}
			<p>
				{$_('weather.wind_direction')}:
				{#if isPost}
					{#if $options.windDirectionType === 'arrow'}
						{$postParsedWeather.windDirection.arrow}
					{:else if $options.windDirectionType === 'text'}
						{$postParsedWeather.windDirection.text}
					{/if}
				{:else if $options.windDirectionType === 'arrow'}
					{$preParsedWeather.windDirection.arrow}
				{:else if $options.windDirectionType === 'text'}
					{$preParsedWeather.windDirection.text}
				{/if}
			</p>
		{/if}

		{#if $options.cloudCover}
			<p>
				{$_('weather.cloud_cover')}:
				{#if isPost}
					{$postParsedWeather.cloudCover}%
				{:else}
					{$preParsedWeather.cloudCover}%
				{/if}
			</p>
		{/if}

		{#if $options.humidity}
			<p>
				{$_('weather.humidity')}:
				{#if isPost}
					{$postParsedWeather.humidity}%
				{:else}
					{$preParsedWeather.humidity}%
				{/if}
			</p>
		{/if}

		{#if $options.pressure}
			<p>
				{$_('weather.pressure')}:
				{#if isPost}
					{$postParsedWeather.pressure} hPa
				{:else}
					{$preParsedWeather.pressure} hPa
				{/if}
			</p>
		{/if}

		{#if $options.sunrise}
			<p>
				{$_('weather.sunrise')}:
				{#if isPost}
					{$postParsedWeather.sunrise}
				{:else}
					{$preParsedWeather.sunrise}
				{/if}
			</p>
		{/if}

		{#if $options.sunset}
			<p>
				{$_('weather.sunset')}:
				{#if isPost}
					{$postParsedWeather.sunset}
				{:else}
					{$preParsedWeather.sunset}
				{/if}
			</p>
		{/if}

		{#if $options.attr}
			{@html $_('weather.generated_by')}
		{/if}
	</div>
</div>

<style>
	.weatherDisp-container {
		display: flex;
		flex-direction: column;
		justify-items: center;
		align-items: center;
		background-color: var(--weather-disp-bg);
	}

	.results-preview {
		font-size: 0.75rem;
		margin: auto;
		width: fit-content;
		transition: filter 100ms;
	}

	.blur {
		filter: blur(5px) grayscale(100%);
		pointer-events: none;
	}
</style>
