import { FollowerService } from '$lib/server/modules/followers/followerService';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	follow: async ({ request, cookies }) => {
		console.log('follow');
		const uid = cookies.get('uid');
		if (!uid) throw redirect(301, '/auth');

		const form = await request.formData();
		const otherUid = form.get('otherUid');
		if (typeof otherUid !== 'string') {
			return fail(400, { invalid: true });
		}
		FollowerService.follow(uid, otherUid);
		return { success: true };
	}
	// unfollow: async ({ request, cookies }) => {
	// 	const uid = cookies.get('uid');
	// 	if (!uid) throw redirect(301, '/auth');

	// 	const form = await request.formData();
	// 	const otherUid = form.get('otherUid');

	// 	if (typeof otherUid !== 'string') {
	// 		return fail(400, { invalid: true });
	// 	}

	// 	FollowerService.follow(uid, otherUid);
	// }
};
