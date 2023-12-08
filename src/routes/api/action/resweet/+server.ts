import type { Resweet } from '$lib/server/modules/resweets';
import { ResweetService } from '$lib/server/modules/resweets/resweetService.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const uid = cookies.get('uid');
	if (!uid) {
		return json({ message: 'Not logged in.', status: 401 });
	}
	const resweet: Resweet = await request.json();
	const res = await ResweetService.createResweet(resweet);
	return json({ res });
}
