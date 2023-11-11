import { type UserProfile, UserProfileService } from '$lib/server/modules/userProfiles';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw error(401, 'Unauthorized');
	if (params.uid === uid) throw redirect(301, '/profile');

	const userProfile: UserProfile | null = await UserProfileService.getUserProfileById(uid);
	if (!userProfile) throw error(404, 'Profile not found');

	return { userProfile };
};
