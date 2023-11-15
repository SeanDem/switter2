import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';

export const load = async ({ params }) => {
	const sweetDetailList = await InteractionService.getInteractionListByTypeAndUid(
		'sweet',
		params.uid
	);
	return { sweetDetailList };
};
