import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw redirect(301, '/auth');
	const commentDetailList = await InteractionService.getAllLikedInteractions(uid, params.uid);
	return { commentDetailList };
};
