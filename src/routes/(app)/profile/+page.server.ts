import { FollowerService } from '$lib/server/modules/followers/followerService';
import { redirect, type Actions, fail } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	throw redirect(301, `/profile/${cookies.get('uid')}`);
};

export const actions: Actions = {
	follow: async ({ request, cookies }) => {
		const uid = cookies.get('uid');
		if (!uid) throw redirect(301, '/auth');

		const form = await request.formData();
		const otherUid = form.get('otherUid');
		if (typeof otherUid !== 'string') {
			return fail(400, { invalid: true });
		}
		const res = await FollowerService.follow(uid, otherUid);
		return { success: res.status === 200 };
	},
	unfollow: async ({ request, cookies }) => {
		const uid = cookies.get('uid');
		if (!uid) throw redirect(301, '/auth');

		const form = await request.formData();
		const otherUid = form.get('otherUid');

		if (typeof otherUid !== 'string') {
			return fail(400, { invalid: true });
		}

		const res = await FollowerService.unfollow(uid, otherUid);
		return { success: res.status === 200 };
	}
};
