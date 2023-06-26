import { PUBLIC_USE_MOCK_API } from '$env/static/public';
const useMock = PUBLIC_USE_MOCK_API === 'TRUE' ? true : false;

export async function handleFetch({ request, fetch }) {
	if (useMock) {
		console.log('-----USING MOCK DATA------');
		if (request.url.startsWith('https://api.ebird.org/v2/product/checklist/view/')) {
			return fetch('/api/checklist');
		}
		if (request.url.startsWith('https://api.ebird.org/v2/ref/region/info')) {
			return fetch('/api/location');
		}
		if (request.url.startsWith('https://api.openweathermap.org/data/3.0/onecall/timemachine')) {
			return fetch('/api/weather');
		}
	}
	return fetch(request);
}
