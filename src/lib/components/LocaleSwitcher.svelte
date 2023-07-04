<script>
	import { language, languageChange, postStatus, preStatus } from '$lib/store';

	function switchLocale() {
		// prevent showing stale data in the wrong language when switching languages
		$postStatus = 'init';
		$preStatus = 'init';
		$languageChange = Date.now();
	}
</script>

<div class="choose-locale">
	<select bind:value={$language} on:change={switchLocale}>
		<option value="en">English</option>
		<option value="es">Español</option>
		<option value="fr">Français</option>
	</select>
</div>
