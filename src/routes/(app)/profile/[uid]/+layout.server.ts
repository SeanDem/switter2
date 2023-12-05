import { UserProfileService } from '$lib/server/modules/userProfiles';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw redirect(301, '/auth');

	let isUserProfile = false;
	if (params.uid === uid) isUserProfile = true;

	const [userProfile] = await Promise.all([UserProfileService.getUserProfileById(uid, params.uid)]);

	if (!userProfile) throw error(404, 'Profile not found');
	return { userProfile, isUserProfile };
};
