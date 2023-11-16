import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';

export const load = async ({ params }) => {
	const resweetDetailList = await InteractionService.getInteractionListByTypeAndUid(
		'resweet',
		params.uid
	);
	return { resweetDetailList };
};
