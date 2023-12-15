import { UserProfileService } from '$lib/server/modules/userProfile';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw redirect(301, '/auth');

	let isUserProfile = false;
	if (params.uid === uid) isUserProfile = true;

	const userProfileRes = await UserProfileService.getUserProfileDetailsById(uid, params.uid);
	const userProfile = userProfileRes.data;
	if (!userProfile) throw error(404, 'User profile not found');

	return { userProfile, isUserProfile };
};
