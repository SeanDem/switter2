import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';
import { createInteractionIdRequest } from '$lib/utils/formUtils';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) return;
	const [resweetDetailRes, commentDetailListRes] = await Promise.all([
		InteractionService.getInteractionById(uid, { resweetId: params.resweetId }),
		InteractionService.getCommentsById(uid, { resweetId: params.resweetId })
	]);

	let parentInteractionRes;
	if (resweetDetailRes.data) {
		const interactionReqParent = createInteractionIdRequest(resweetDetailRes.data);
		parentInteractionRes = await InteractionService.getInteractionById(uid, interactionReqParent);
	}
	const parentInteraction = parentInteractionRes?.data;
	const resweetDetail = resweetDetailRes.data;
	const commentDetailList = commentDetailListRes.data;

	return { parentInteraction, resweetDetail, commentDetailList };
};
