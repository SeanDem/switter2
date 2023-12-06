import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) return;
	const [resweetDetailRes, commentDetailListRes] = await Promise.all([
		InteractionService.getInteractionById(uid, { resweetId: params.resweetId }),
		InteractionService.getCommentsById(uid, { resweetId: params.resweetId })
	]);
	const resweetDetail = resweetDetailRes.data;
	const commentDetailList = commentDetailListRes.data;
	return { resweetDetail, commentDetailList };
};
