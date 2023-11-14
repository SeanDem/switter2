import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';

export const load = async ({ params }) => {
	const [sweetDetails, commentList] = await Promise.all([
		InteractionService.getInteractionById({ _sweet_id: params.sweetId }),
		InteractionService.getcommentsById({ _sweet_id: params.sweetId })
	]);
	return { sweetDetails, commentList };
};
