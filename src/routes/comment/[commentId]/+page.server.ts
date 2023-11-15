import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const [commentDetail, commentList] = await Promise.all([
		InteractionService.getInteractionById({ commentId: params.commentId }),
		InteractionService.getCommentsById({ commentId: params.commentId })
	]);
	const parentInteraction = await InteractionService.getInteractionById({
		commentId: commentDetail.parentCommentId,
		sweetId: commentDetail.sweetId,
		resweetId: commentDetail.resweetId
	});
	return { commentDetail, commentList, parentInteraction };
};
