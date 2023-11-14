import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';

export const load = async ({ params }) => {
	const [sweetDetails, commentList] = await Promise.all([
		InteractionService.getInteractionById({ commentId: params.commentId }),
		InteractionService.getCommentsById({ commentId: params.commentId })
	]);
	return { sweetDetails, commentList };
};
