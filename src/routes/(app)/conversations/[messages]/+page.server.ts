import { MessageService } from '$lib/server/modules/messages/messageService.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw redirect(301, '/auth');

	const messages = MessageService.getAllMessagesByConversationId(params.messages);
	return { messages };
};
