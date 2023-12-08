import { SweetService } from '$lib/server/modules/sweets/sweetService.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const uid = cookies.get('uid');
	if (!uid) return json({ message: 'Not logged in.', status: 401 });

	const sweetText: string = await request.json();
	const res = await SweetService.createSweet(uid, sweetText);

	return json({ res });
}
