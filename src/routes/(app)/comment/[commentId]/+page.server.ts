import type { Interaction } from '$lib/server/modules/interactions';
import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';
import type { APIResponse } from '$lib/server/modules/types/types';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) return;

	const [commentDetailRes, commentListRes] = await Promise.all([
		InteractionService.getInteractionById(uid, { commentId: params.commentId }),
		InteractionService.getCommentsById(uid, { commentId: params.commentId })
	]);
	const commentDetail = commentDetailRes.data ?? null;
	const commentList = commentListRes.data ?? [];

	let parentInteractionRes: APIResponse<Interaction | null> | null = null;
	if (commentDetail) {
		parentInteractionRes = await InteractionService.getInteractionById(uid, {
			commentId: commentDetail.parentCommentId,
			sweetId: commentDetail.sweetId,
			resweetId: commentDetail.resweetId
		});
	}
	const parentInteraction = parentInteractionRes?.data ?? null;

	return { commentDetail, commentList, parentInteraction };
};
