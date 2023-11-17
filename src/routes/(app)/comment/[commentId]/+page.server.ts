import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) return;

	const [commentDetail, commentList] = await Promise.all([
		InteractionService.getInteractionById(uid, { commentId: params.commentId }),
		InteractionService.getCommentsById(uid, { commentId: params.commentId })
	]);
	const parentInteraction = await InteractionService.getInteractionById(uid, {
		commentId: commentDetail.parentCommentId,
		sweetId: commentDetail.sweetId,
		resweetId: commentDetail.resweetId
	});
	return { commentDetail, commentList, parentInteraction };
};
