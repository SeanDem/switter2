import { FollowerService } from '$lib/server/modules/followers/followerService';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const uid = cookies.get('uid');
	if (!uid) {
		return json({ message: 'Not logged in.', status: 401 });
	}
	const followUid = await request.json();
	const res = await FollowerService.unfollow(uid, followUid);
	return json({ res });
}
