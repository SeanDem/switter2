import { UserProfileService, type UserProfile } from '$lib/server/modules/userProfiles';
import { error } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw error(401, 'Unauthorized');

	const userProfile: UserProfile | null = await UserProfileService.getUserProfileById(uid);
	if (!userProfile) throw error(404, 'Profile not found');

	return { userProfile };
};
