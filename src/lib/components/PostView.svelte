<script>
	import PostInputForm from '$lib/components/PostComponents/PostInputForm.svelte';
	import ChecklistInfo from '$lib/components/PostComponents/ChecklistInfo.svelte';
	import WeatherResults from '$lib/components/PostComponents/WeatherResults.svelte';
</script>

<div class="ui-container">
	<PostInputForm />
	<ChecklistInfo />
	<WeatherResults />
</div>

<style>
	.ui-container {
		grid-template-rows: repeat(4, auto) 1fr;
	}
</style>
