<script>
	import { postChecklistInfo, postStatus } from '$lib/store';
</script>

<div class="checklist-info full-width">
	{#if $postStatus === 'show'}
		{#if $postChecklistInfo.checklistId}
			<p>{$postChecklistInfo.checklistId}</p>
		{/if}
		{#if $postChecklistInfo.locationName}
			<p>{$postChecklistInfo.locationName}</p>
		{/if}
		{#if $postChecklistInfo.startTime}
			<p>{$postChecklistInfo.startTime}</p>
		{/if}
	{/if}
</div>

<style>
	.checklist-info {
		font-size: small;
		margin-top: 30px;
	}
</style>
