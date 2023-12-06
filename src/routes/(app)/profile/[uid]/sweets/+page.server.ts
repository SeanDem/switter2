import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw redirect(301, '/auth');

	const sweetDetailListRes = await InteractionService.getInteractionListByTypeAndUid(
		uid,
		'sweet',
		params.uid
	);
	const sweetDetailList = sweetDetailListRes.data;

	return { sweetDetailList };
};
