import { ConversationService } from '$lib/server/modules/conversations/conversationService.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const uid = cookies.get('uid');
	if (!uid) {
		return json({ message: 'Not logged in.', status: 401 });
	}

	const { otherUid } = await request.json();

	const conversationRes = await ConversationService.getOrCreateConversation(uid, otherUid);
	return json({ conversation: conversationRes });
}
