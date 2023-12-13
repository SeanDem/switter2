import { InteractionService } from '$lib/server/modules/interactions';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw redirect(301, '/auth');
	const [resAll, resFollowing] = await Promise.all([
		InteractionService.getInteractionList(uid),
		InteractionService.getInteractionListByFollowing(uid)
	]);
	const sweetDetailListFollowing = resFollowing.data;
	const sweetDetailListAll = resAll.data;
	return { sweetDetailListAll, sweetDetailListFollowing };
};
