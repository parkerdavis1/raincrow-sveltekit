<script>
	import { dailyCount } from '$lib/store';
	import { _ } from '$lib/services/i18n';

	$: remainingCount = 5 - $dailyCount;
</script>

<div class="daily-request-pane">
	<p>{$_('daily_request.remaining')} {remainingCount}</p>
</div>

<style>
	.daily-request-pane {
		text-align: center;
		width: fit-content;
		height: fit-content;
		color: var(--daily-request-text);
		font-size: 0.9rem;
		justify-self: end;
		align-self: center;
	}
</style>
