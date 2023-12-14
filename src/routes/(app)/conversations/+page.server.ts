import { ConversationService } from '$lib/server/modules/conversations';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw redirect(301, '/auth');

	const conversations = await ConversationService.getAllConversationListByUid(uid);
	return { conversations };
};
