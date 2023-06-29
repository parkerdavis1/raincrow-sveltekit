<script>
	import PostInputForm from '$lib/components/PostComponents/PostInputForm.svelte';
	import ChecklistInfo from '$lib/components/PostComponents/ChecklistInfo.svelte';
	import ResultsPane from '$lib/components/ResultsPane.svelte';
</script>

<div class="ui-container">
	<PostInputForm />
	<ChecklistInfo />
	<ResultsPane isPost={true} />
</div>

<style>
	.ui-container {
		grid-template-rows: repeat(4, auto) 1fr;
	}
</style>
