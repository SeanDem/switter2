import { InteractionService } from '$lib/server/modules/interactions';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw redirect(301, '/auth');
	const res = await InteractionService.getInteractionListByType(uid, 'sweet');
	const sweetDetailList = res.data;
	return { sweetDetailList };
};
