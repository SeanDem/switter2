import { LikeService } from '$lib/server/modules/likes';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const uid = cookies.get('uid');
	if (!uid) {
		return json({ message: 'Not logged in.', status: 401 });
	}
	const { interactionIdRequest } = await request.json();
	return json(await LikeService.deleteSweetLike(uid, interactionIdRequest));
}
