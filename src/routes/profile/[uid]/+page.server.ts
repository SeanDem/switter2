import { SweetService, type Sweet } from '$lib/server/modules/sweets';
import { type UserProfile, UserProfileService } from '$lib/server/modules/userProfiles';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw new Error(error.message);
	401, 'Unauthorized';
	if (params.uid === uid) throw redirect(301, '/profile');

	const userProfile: UserProfile | null = await UserProfileService.getUserProfileById(uid);
	if (!userProfile) throw new Error(error.message);
	404, 'Profile not found';

	const sweetList: Sweet[] | null = await SweetService.getSweetsByUid(uid);
	return { userProfile, sweetList };
};
