import { ConversationDAO, type Conversation, type ConversationDetail } from '../conversations';

export class ConversationService {
	static async getOrCreateConversation(
		uid: string,
		otherUid: string
	): Promise<Conversation | null> {
		if (uid === otherUid) throw new Error('uid and otherUid cannot be the same');

		const conversation = ConversationService.getConversation(uid, otherUid);
		if (conversation) return conversation;
		return await ConversationDAO.createConversation(uid, otherUid);
	}

	static async getAllConversationListByUid(uid: string): Promise<ConversationDetail[]> {
		return await ConversationDAO.getConversationListByUid(uid);
	}

	static async getConversation(uid: string, otherUid: string): Promise<Conversation | null> {
		const conversation = await ConversationDAO.getConversationByUid(uid, otherUid);
		if (conversation) return conversation;

		return await ConversationDAO.createConversation(uid, otherUid);
	}

}
