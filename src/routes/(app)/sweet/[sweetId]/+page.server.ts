import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) return;
	const [sweetDetailsRes, commentListRes] = await Promise.all([
		InteractionService.getInteractionById(uid, { sweetId: params.sweetId }),
		InteractionService.getCommentsById(uid, { sweetId: params.sweetId })
	]);
	const sweetDetails = sweetDetailsRes.data;
	const commentList = commentListRes.data;
	return { sweetDetails, commentList };
};
