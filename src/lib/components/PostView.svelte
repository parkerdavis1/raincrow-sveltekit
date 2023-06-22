<script>
	import InputForm from '$lib/components/PostComponents/InputForm.svelte';
	import ChecklistInfo from '$lib/components/PostComponents/ChecklistInfo.svelte';
	import WeatherResults from '$lib/components/PostComponents/WeatherResults.svelte';
</script>

<div class="ui-container">
	<InputForm />
	<ChecklistInfo />
	<WeatherResults />
</div>

<style>
	.ui-container {
		grid-template-rows: repeat(4, auto) 1fr;
	}
</style>
