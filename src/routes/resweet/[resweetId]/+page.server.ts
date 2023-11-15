import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const [resweetDetail, commentDetailList] = await Promise.all([
		InteractionService.getInteractionById({ resweetId: params.resweetId }),
		InteractionService.getCommentsById({ resweetId: params.resweetId })
	]);
	return { resweetDetail, commentDetailList };
};
