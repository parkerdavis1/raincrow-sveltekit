<script>
	import { language } from '$lib/store';

	export let value = localStorage.storedLanguage;

	function switchLocale(event) {
		event.preventDefault();
		$language = event.target.value;
	}
</script>

<div class="choose-locale">
	<select {value} on:change={switchLocale}>
		<option value="en">English</option>
		<option value="fr">Français</option>
		<option value="es">Español</option>
	</select>
</div>
