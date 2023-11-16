import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';

export const load = async ({ params }) => {
	const commentDetailList = await InteractionService.getInteractionListByTypeAndUid(
		'comment',
		params.uid
	);
	return { commentDetailList };
};
