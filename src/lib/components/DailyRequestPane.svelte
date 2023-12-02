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
</script>

<p>{$_('daily_request.error')}</p>
<p>{$_('daily_request.try_again')} {displayTimeUntil}</p>

<style>
	p {
		text-align: center;
	}
</style>
