import { MessageDao } from './messageDao';

export class MessageService {
	static async getAllMessagesByConversationId(conversationId: string): Promise<Message[]> {
		return await MessageDao.getAllMessagesByConversationId(conversationId);
	}
	static async createMessage(message: Partial<Message>): Promise<Message> {
		return await MessageDao.createMessage(message);
	}
}
