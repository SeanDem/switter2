import { UserProfileService, type UserProfile } from '$lib/server/modules/userProfiles';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	return parent();
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const uid = cookies.get('uid');

		if (!uid) {
			throw fail(401, { uid, message: 'Unauthorized' });
		}

		const form = await request.formData();

		const handle = form.get('handle') as string;
		const bio = form.get('bio') as string;
		const name = form.get('name') as string;
		const phone = form.get('phone') as string;
		const email = form.get('email') as string;
		const birthdayStr = form.get('birthday') as string;
		const birthday = birthdayStr ? new Date(birthdayStr) : null;
		const profileUrl = form.get('profileUrl') as string;
		const UserProfile: UserProfile = {
			uid,
			name,
			handle,
			bio,
			phone,
			email,
			birthday
		};
		UserProfileService.updateUserProfile(uid, UserProfile);

		throw redirect(301, '/profile');
	}
};
