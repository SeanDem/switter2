import { goto } from '$app/navigation';
import type { Conversation } from '$lib/server/modules/conversations';

export async function handleMessageUser(uid?: string | null) {
	if (!uid) return;
	const response = await fetch('/api/conversation', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			otherUid: uid
		})
	});
	if (response.ok) {
		const { conversation }: { conversation: Conversation } = await response.json();
		goto(`/conversations/${conversation.conversationId}`);
	}
}
