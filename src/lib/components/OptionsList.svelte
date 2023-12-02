<script>
	import { options } from '$lib/store';
	import { _ } from '$lib/services/i18n';
	import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';
</script>

<div class="options-list">
	<!-- Weather Icons -->
	<div class="option-item">
		<input type="checkbox" name="icon" id="icon" bind:checked={$options.icon} />
		<label for="icon">{$_('options.weather_icon')}</label>
		<select name="icon-type" id="icon-type" bind:value={$options.iconType}>
			<option value="open">OpenWeather</option>
			<option value="emoji">{$_('options.emoji')}</option>
		</select>
	</div>

	<!-- Conditions -->
	<div class="option-item">
		<input type="checkbox" name="conditions" id="conditions" bind:checked={$options.conditions} />
		<label for="conditions">{$_('options.conditions')}</label>
	</div>

	<!-- Temperature -->
	<div class="option-item">
		<input
			type="checkbox"
			name="temperature"
			id="temperature"
			bind:checked={$options.temperature}
		/>
		<label for="temperature">{$_('options.temperature')}</label>
		<select name="temp-unit" id="temp-unit" bind:value={$options.temperatureUnit}>
			<option value="f">F°</option>
			<option value="c">C°</option>
		</select>
	</div>

	<!-- Windspeed -->
	<div class="option-item">
		<input type="checkbox" name="windspeed" id="windspeed" bind:checked={$options.windspeed} />
		<label for="windspeed">{$_('options.windspeed')}</label>
		<select name="wind-unit" id="wind-unit" bind:value={$options.windUnit}>
			<option value="description">{$_('options.windspeed_description')}</option>
			<option value="beaufort">{$_('options.windspeed_beaufort_scale')}</option>
			<option value="mph">mph</option>
			<option value="kmh">km/h</option>
			<option value="ms">m/s</option>
		</select>
	</div>

	<!-- Wind Direction -->
	<div class="option-item">
		<input
			type="checkbox"
			name="windDirection"
			id="windDirection"
			bind:checked={$options.windDirection}
		/>
		<label for="windDirection">{$_('options.wind_direction')}</label>
		<!-- <select name="windDirectionType" id="windDirectionType" bind:value={$options.windDirectionType}>
        <option value="arrow">Arrow</option>
        <option value="text">Text</option>
      </select> -->
	</div>

	<!-- Cloud Cover -->
	<div class="option-item">
		<input type="checkbox" name="cloudCover" id="cloudCover" bind:checked={$options.cloudCover} />
		<label for="cloudCover">{$_('options.cloud_cover')} (%)</label>
	</div>

	<!-- Humidity -->
	<div class="option-item">
		<input type="checkbox" name="humidity" id="humidity" bind:checked={$options.humidity} />
		<label for="humidity">{$_('options.humidity')} (%)</label>
	</div>

	<!-- Pressure -->
	<div class="option-item">
		<input type="checkbox" name="pressure" id="pressure" bind:checked={$options.pressure} />
		<label for="pressure">{$_('options.pressure')} (hPa)</label>
	</div>

	<!-- Sunrise -->
	<div class="option-item">
		<input type="checkbox" name="sunrise" id="sunrise" bind:checked={$options.sunrise} />
		<label for="sunrise">{$_('options.sunrise')}</label>
	</div>

	<!-- Sunset -->
	<div class="option-item">
		<input type="checkbox" name="sunset" id="sunset" bind:checked={$options.sunset} />
		<label for="sunset">{$_('options.sunset')}</label>
	</div>

	<!-- Include Link -->
	<div class="option-item">
		<input type="checkbox" name="attr" id="attr" bind:checked={$options.attr} />
		<label for="attr">{$_('options.include_link')}</label>
	</div>

	<hr />
	<div class="option-item">
		<label for="language">{$_('options.language')}</label>
		<LocaleSwitcher />
	</div>
</div>

<style>
	.option-item {
		padding: 5px 5px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.option-item input {
		flex-grow: 0;
	}

	.option-item label {
		flex-grow: 1;
	}
</style>
