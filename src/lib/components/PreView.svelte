<script>
	// Components
	import PreInputForm from '$lib/components/PreComponents/PreInputForm.svelte';
	import ResultsPane from '$lib/components/ResultsPane.svelte';

	// Services
	import { _ } from '$lib/services/i18n';
</script>

<div class="ui-container">
	<PreInputForm />
	<ResultsPane isPost={false} />
</div>

<style>
	.ui-container {
		grid-template-rows: repeat(7, auto) 1fr;
	}
</style>
