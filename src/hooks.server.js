import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import { PUBLIC_USE_MOCK_API } from '$env/static/public';

Sentry.init({
	dsn: 'https://431781bc3e3b4976b9613de3985fb110@o4505457000120320.ingest.sentry.io/4505457003266048',
	enabled: process.env.NODE_ENV !== 'development'
});

const useMock = PUBLIC_USE_MOCK_API === 'TRUE' ? true : false;

export async function handleFetch({ request, fetch }) {
	if (useMock) {
		console.log('-----USING MOCK DATA------');
		if (request.url.startsWith('https://api.ebird.org/v2/product/checklist/view/')) {
			return fetch('/api/checklist'); // for normal requests
			// return fetch('/api/error'); // for connection errors
			// return fetch('/api/checklistHistoric'); // for historic checklist errors
			// return fetch('/api/checklistOld'); // for too old checklist errors
		}
		if (request.url.startsWith('https://api.ebird.org/v2/ref/region/info')) {
			return fetch('/api/location'); // for normal requests
			// return fetch('/api/error'); // for errors
		}
		if (request.url.startsWith('https://api.openweathermap.org')) {
			return fetch('/api/weather'); // for normal requests

			// return new Response('Error 429 - Too Many Requests', {
			// 	status: 429,
			// 	statusText: 'Error 429 - Too Many Requests'
			// });

			// return fetch('/api/error'); // for errors
			// return fetch('/api/testweather');
		}
	}
	return fetch(request);
}
export const handleError = Sentry.handleErrorWithSentry();
export const handle = sequence(Sentry.sentryHandle());
