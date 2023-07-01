<script>
	import { aboutView } from '$lib/store';
	import { _ } from '$lib/services/i18n';
	import AboutContent from '$lib/components/AboutContent.svelte';
</script>

<div class="menu-container">
	<!-- <button class="menu-exit" on:click={()=> $aboutView = false}>🆇</button> -->

	<div class="scroll">
		<AboutContent />
	</div>

	<div class="center">
		<button class="button" on:click={() => ($aboutView = false)}
			>{$_('global_ui.close').toUpperCase()}</button
		>
	</div>
</div>

<style>
	.scroll {
		overflow: scroll;
		padding-inline: 1rem;
	}

	.center {
		text-align: center;
	}

	.button {
		width: 200px;
	}
</style>
