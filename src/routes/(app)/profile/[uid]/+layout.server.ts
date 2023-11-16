import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';
import { UserProfileService } from '$lib/server/modules/userProfiles';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw redirect(301, '/auth');

	let isUserProfile = false;
	if (params.uid === uid) isUserProfile = true;

	const pageUid = params.uid;
	const [userProfile, sweetDetailList] = await Promise.all([
		UserProfileService.getUserProfileById(uid, pageUid),
		InteractionService.getInteractionListByTypeAndUid('sweet', pageUid)
	]);
	if (!userProfile) throw error(404, 'Profile not found');
	return { userProfile, sweetDetailList, isUserProfile };
};
