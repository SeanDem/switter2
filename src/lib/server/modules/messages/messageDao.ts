import { supabaseService } from '$lib/server/utils/supabaseService';

function transformToCamelCase(data: Record<string, any>): Record<string, any> {
	return Object.keys(data).reduce((acc, key) => {
		const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
		acc[camelCaseKey] = data[key];
		return acc;
	}, {} as Record<string, any>);
}

export class MessageDao {
	static async createMessage(message: Partial<Message>): Promise<Message> {
		const { data, error } = await supabaseService
			.from('message')
			.insert([
				{
					conversation_id: message.conversationId,
					uid: message.uid,
					text: message.text
				}
			])
			.select('*')
			.single();

		if (error) throw new Error(error.message + error.hint);
		return transformToCamelCase(data) as Message;
	}

	static async getAllMessagesByConversationId(conversationId: string): Promise<Message[]> {
		const { data, error } = await supabaseService
			.from('message')
			.select('*')
			.eq('conversation_id', conversationId);

		if (error) throw new Error(error.message + error.hint);
		return data!.map((d) => transformToCamelCase(d) as Message);
	}

	static async getInitialMessages(conversationId: string): Promise<Message[]> {
		let { data, error } = await supabaseService
			.from('Message')
			.select('*')
			.eq('conversation_id', conversationId)
			.order('timestamp', { ascending: false });

		if (error) throw new Error(error.message);
		return data!.map((d) => transformToCamelCase(d) as Message);
	}
}
