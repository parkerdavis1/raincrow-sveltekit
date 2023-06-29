<script>
	export let isPost;

	let copyButtonText = $_('clipboard.copy');
	let copyButtonDisabled = false;

	import { _ } from '$lib/services/i18n';
	import { preWeatherCopy, postWeatherCopy, preStatus, postStatus } from '../store';

	$: if ($postStatus === 'loading' || $preStatus === 'loading') {
		copyButtonDisabled = false;
		copyButtonText = $_('clipboard.copy');
	}

	const copyToClipboard = () => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(isPost ? $postWeatherCopy : $preWeatherCopy).then(
				function () {
					copyButtonText = $_('clipboard.copied');
					copyButtonDisabled = true;
					setTimeout(() => {
						copyButtonText = $_('clipboard.copy');
						copyButtonDisabled = false;
					}, 3000);
				},
				function (err) {
					copyButtonText = $_('clipboard.error');
					copyButtonDisabled = true;
				}
			);
		} else {
			copyButtonText = $_('clipboard.browser_error');
			copyButtonDisabled = true;
		}
	};
</script>

<button class="button copy-button" on:click={copyToClipboard} disabled={copyButtonDisabled}>
	{copyButtonText}
</button>
<!-- class:disabled={copyButtonDisabled} -->
