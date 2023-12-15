import { ConversationService } from '$lib/server/modules/conversations/conversationService.js';
import { MessageService } from '$lib/server/modules/messages/messageService.js';
import { UserProfileService } from '$lib/server/modules/userProfile/userProfileService.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw redirect(301, '/auth');

	const [messages, conversation] = await Promise.all([
		MessageService.getAllMessagesByConversationId(params.messages),
		ConversationService.getConversationById(params.messages)
	]);
	const otherUid = conversation?.uid === uid ? conversation?.otherUid : conversation?.uid;
	const otherUserProfileRes = await UserProfileService.getUserProfileByUid(otherUid ?? '');
	const otherUserProfile = otherUserProfileRes?.data;
	return { messages, otherUserProfile };
};
