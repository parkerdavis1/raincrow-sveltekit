import { json } from '@sveltejs/kit';
import location from './location.json';

export async function GET() {
	return json(location);
}
