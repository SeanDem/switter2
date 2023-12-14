import { MessageService } from '$lib/server/modules/messages/messageService.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const uid = cookies.get('uid');
	if (!uid) {
		return json({ message: 'Not logged in.', status: 401 });
	}
	const res = await request.json();
	res.uid = uid;
	const conversationRes = await MessageService.createMessage(res);
	return json({ conversation: conversationRes });
}
