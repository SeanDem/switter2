import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';

export const load = async ({ params }) => {
	const [resweetDetail, commentDetailList] = await Promise.all([
		InteractionService.getInteractionById({ resweetId: params.resweetId }),
		InteractionService.getCommentsById({ resweetId: params.resweetId })
	]);
	return { resweetDetail, commentDetailList };
};
