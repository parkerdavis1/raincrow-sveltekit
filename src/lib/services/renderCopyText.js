import { _ } from '$lib/services/i18n';
import { get } from 'svelte/store';

// render clipboard copy text
export function renderCopyText(options, parsedWeather) {
	let textReturn = '';
	if (options.icon) {
		if (options.iconType === 'open') {
			textReturn += parsedWeather.icon.open;
		} else if (options.iconType === 'emoji') {
			textReturn += parsedWeather.icon.emoji;
		}
		textReturn += '\n';
	}
	if (options.conditions) {
		textReturn += parsedWeather.conditions;
		textReturn += '\n';
	}
	if (options.temperature) {
		textReturn += get(_)('weather.temperature') + ': ';
		textReturn +=
			options.temperatureUnit === 'c' ? parsedWeather.temperature.c : parsedWeather.temperature.f;
		textReturn += '\n';
	}
	if (options.windspeed) {
		textReturn += get(_)('weather.wind') + ': ';
		if (options.windUnit === 'description') {
			textReturn += parsedWeather.windspeed.description;
		} else if (options.windUnit === 'beaufort') {
			textReturn += 'Beaufort force ';
			textReturn += parsedWeather.windspeed.beaufort;
		} else if (options.windUnit === 'mph') {
			textReturn += parsedWeather.windspeed.mph;
		} else if (options.windUnit === 'kmh') {
			textReturn += parsedWeather.windspeed.kmh;
		} else if (options.windUnit === 'ms') {
			textReturn += parsedWeather.windspeed.ms;
		}
		textReturn += '\n';
	}
	if (options.windDirection) {
		textReturn += get(_)('weather.wind_direction') + ': ';
		textReturn += parsedWeather.windDirection.text;
		textReturn += '\n';
	}
	if (options.cloudCover) {
		textReturn += get(_)('weather.cloud_cover') + ': ';
		textReturn += parsedWeather.cloudCover + '%';
		textReturn += '\n';
	}
	if (options.humidity) {
		textReturn += get(_)('weather.humidity') + ': ';
		textReturn += parsedWeather.humidity + '%';
		textReturn += '\n';
	}
	if (options.pressure) {
		textReturn += get(_)('weather.pressure') + ': ';
		textReturn += parsedWeather.pressure + ' hPa';
		textReturn += '\n';
	}
	if (options.sunrise) {
		textReturn += get(_)('weather.sunrise') + ': ';
		textReturn += parsedWeather.sunrise;
		textReturn += '\n';
	}
	if (options.sunset) {
		textReturn += get(_)('weather.sunset') + ': ';
		textReturn += parsedWeather.sunset;
		textReturn += '\n';
	}
	if (options.attr) {
		textReturn += get(_)('weather.generated_by');
		textReturn += '\n';
	}
	textReturn = textReturn.slice(0, textReturn.length - 1); //remove last \n
	return textReturn;
}
