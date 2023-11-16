import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';

export const load = async ({ params }) => {
	const [sweetDetails, commentList] = await Promise.all([
		InteractionService.getInteractionById({ sweetId: params.sweetId }),
		InteractionService.getCommentsById({ sweetId: params.sweetId })
	]);
	return { sweetDetails, commentList };
};
