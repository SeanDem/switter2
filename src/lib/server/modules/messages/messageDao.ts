import { supabase } from '$lib/utils/supabaseClient';
import type { Message } from './messagesType';

export class MessageDAO {
	static async createMessage(message: Omit<Message, 'message_id'>): Promise<Message> {
		const { data, error } = await supabase.from('message').insert([message]);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async getMessageById(message_id: string): Promise<Message | null> {
		const { data, error } = await supabase
			.from('message')
			.select('*')
			.eq('message_id', message_id)
			.single();

		if (error) throw new Error(error.message);
		return data;
	}

	static async updateMessage(
		message_id: string,
		messageUpdates: Partial<Message>
	): Promise<Message> {
		const { data, error } = await supabase
			.from('message')
			.update(messageUpdates)
			.eq('message_id', message_id);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async deleteMessage(message_id: string): Promise<boolean> {
		const { error } = await supabase.from('message').delete().eq('message_id', message_id);

		if (error) throw new Error(error.message);
		return true;
	}

	static async getAllMessages(): Promise<Message[]> {
		const { data, error } = await supabase.from('message').select('*');

		if (error) throw new Error(error.message);
		return data!;
	}
}
