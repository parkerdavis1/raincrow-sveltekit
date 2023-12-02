<script>
	import { dailyCount, dailyCountError } from '$lib/store';
	import { language } from '$lib/store';
	import { _ } from '$lib/services/i18n';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	dayjs.extend(relativeTime);

	let displayTimeUntil;
	$: {
		dayjs.locale(`${$language}`);
		displayTimeUntil = dayjs(timeUntilDailyCountExpiration).fromNow();
	}

	const timeUntilDailyCountExpiration = JSON.parse(localStorage.getItem('dailyCount')).expiry;

	$: remainingCount = 5 - $dailyCount;
</script>

<!-- <div class="daily-request-pane" class:error-pane={$dailyCountError}> -->
{#if $dailyCountError}
	<p>{$_('daily_request.error')}</p>
	<p>{$_('daily_request.try_again')} {displayTimeUntil}</p>
{:else}
	<p>{$_('daily_request.remaining')} {remainingCount}</p>
{/if}

<!-- </div> -->

<style>
	/* .daily-request-pane {
		text-align: center;
		width: fit-content;
		height: fit-content;
		color: var(--daily-request-text);
		font-size: 0.9rem;
		justify-self: end;
		align-self: center;
	}

	.error-pane {
		color: var(--text-color);
	} */
	p {
		text-align: center;
	}
</style>
