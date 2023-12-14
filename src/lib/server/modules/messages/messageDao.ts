import { supabaseService } from '$lib/server/utils/supabaseService';

function transformToCamelCase(data: Record<string, any>): Record<string, any> {
	return Object.keys(data).reduce((acc, key) => {
		const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
		acc[camelCaseKey] = data[key];
		return acc;
	}, {} as Record<string, any>);
}

export class MessageDao {
	static async createMessage(message: Omit<Message, 'messageId'>): Promise<Message> {
		const transformedMessage = transformToCamelCase(message);
		const { data, error } = await supabaseService.from('message').insert([transformedMessage]);

		if (error) throw new Error(error.message);
		return transformToCamelCase(data![0]) as Message;
	}

	static async getAllMessages(): Promise<Message[]> {
		const { data, error } = await supabaseService.from('message').select('*');

		if (error) throw new Error(error.message);
		return data!.map((d) => transformToCamelCase(d) as Message);
	}

	// static async subscribeToMessages(conversationId: string) {
	// 	return supabaseService
	// 		.from('Message')
	// 		.on('INSERT', (liveResponse: any) => {
	// 			if (liveResponse.new.conversation_id === conversationId) {
	// 				const newMessage = transformToCamelCase(liveResponse.new) as Message;
	// 				// Handle the new message (e.g., update UI, state, etc.)
	// 			}
	// 		})
	// 		.subscribe();
	// }

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
