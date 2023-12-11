import { supabaseService } from '$lib/server/utils/supabaseService';
import type { Conversation } from './conversationType';

export class ConversationDAO {
	static async createConversation(
		conversation: Omit<Conversation, 'conversation_id'>
	): Promise<Conversation> {
		const { data, error } = await supabaseService.from('conversation').insert([conversation]);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async getConversationById(conversation_id: string): Promise<Conversation | null> {
		const { data, error } = await supabaseService
			.from('conversation')
			.select('*')
			.eq('conversation_id', conversation_id)
			.single();

		if (error) throw new Error(error.message);
		return data;
	}

	static async updateConversation(
		conversation_id: string,
		conversationUpdates: Partial<Conversation>
	): Promise<Conversation> {
		const { data, error } = await supabaseService
			.from('conversation')
			.update(conversationUpdates)
			.eq('conversation_id', conversation_id);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async deleteConversation(conversation_id: string): Promise<boolean> {
		const { error } = await supabaseService
			.from('conversation')
			.delete()
			.eq('conversation_id', conversation_id);

		if (error) throw new Error(error.message);
		return true;
	}

	static async getAllConversations(): Promise<ConversationDAO[]> {
		const { data, error } = await supabaseService.from('conversation').select('*');

		if (error) throw new Error(error.message);
		return data!;
	}
}
