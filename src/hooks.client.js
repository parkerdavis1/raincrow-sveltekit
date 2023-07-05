import { handleErrorWithSentry } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://431781bc3e3b4976b9613de3985fb110@o4505457000120320.ingest.sentry.io/4505457003266048'
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
