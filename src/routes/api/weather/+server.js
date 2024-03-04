import { json } from '@sveltejs/kit';
import weather from './weather.json';

export async function GET() {
	return json(weather);
}
