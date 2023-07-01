<script>
	import { language, languageChange, postStatus, preStatus } from '$lib/store';

	export let value = localStorage.storedLanguage;

	function switchLocale(event) {
		// prevent showing stale data in the wrong language when switching languages
		$postStatus = 'init';
		$preStatus = 'init';
		$language = event.target.value;
		$languageChange = Date.now();
	}
</script>

<div class="choose-locale">
	<select {value} on:change={switchLocale}>
		<option value="en">English</option>
		<option value="es">Español</option>
		<option value="fr">Français</option>
	</select>
</div>
