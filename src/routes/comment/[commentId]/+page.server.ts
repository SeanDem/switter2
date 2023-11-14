import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';

export const load = async ({ params }) => {
	const [commentDetail, commentList] = await Promise.all([
		InteractionService.getInteractionById({ commentId: params.commentId }),
		InteractionService.getCommentsById({ commentId: params.commentId })
	]);
	console.log('commentDetail: ', commentDetail);
	const parentInteraction = await InteractionService.getInteractionById({
		commentId: commentDetail.parentCommentId,
		sweetId: commentDetail.sweetId,
		resweetId: commentDetail.resweetId
	});
	return { commentDetail, commentList, parentInteraction };
};
