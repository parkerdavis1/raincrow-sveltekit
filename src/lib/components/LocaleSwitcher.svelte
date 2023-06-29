<script>
	import { language, languageChange } from '$lib/store';

	export let value = localStorage.storedLanguage;

	function switchLocale(event) {
		$language = event.target.value;
		$languageChange = '';
	}
</script>

<div class="choose-locale">
	<select {value} on:change={switchLocale}>
		<option value="en">English</option>
		<option value="es">Español</option>
		<option value="fr">Français</option>
	</select>
</div>
