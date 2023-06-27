import { PUBLIC_USE_MOCK_API } from '$env/static/public';
const useMock = PUBLIC_USE_MOCK_API === 'TRUE' ? true : false;

export async function handleFetch({ request, fetch }) {
	if (useMock) {
		console.log('-----USING MOCK DATA------');
		if (request.url.startsWith('https://api.ebird.org/v2/product/checklist/view/')) {
			return fetch('/api/checklist');
			// return fetch('/api/error'); // for connection errors
			// return fetch('/api/checklistHistoric'); // for historic checklist errors
			// return fetch('/api/checklistOld'); // for too old checklist errors
		}
		if (request.url.startsWith('https://api.ebird.org/v2/ref/region/info')) {
			return fetch('/api/location');
			// return fetch('/api/error'); // for errors
		}
		if (request.url.startsWith('https://api.openweathermap.org')) {
			return fetch('/api/weather');
			// return fetch('/api/error'); // for errors
		}
	}
	return fetch(request);
}
