import { json } from '@sveltejs/kit';
import checklist from './checklist.json';

export async function GET() {
	return json(checklist);
}
