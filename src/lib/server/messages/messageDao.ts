import { supabase } from "$lib/supabaseClient";
import type { Message } from "./messagesType";

class MessageDAO {
	static async createMessage(message: Omit<Message, 'message_id'>): Promise<Message> {
		const { data, error } = await supabase.from('Message').insert([message]);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async getMessageById(message_id: string): Promise<Message | null> {
		const { data, error } = await supabase
			.from('Message')
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
			.from('Message')
			.update(messageUpdates)
			.eq('message_id', message_id);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async deleteMessage(message_id: string): Promise<boolean> {
		const { error } = await supabase.from('Message').delete().eq('message_id', message_id);

		if (error) throw new Error(error.message);
		return true;
	}

	static async getAllMessages(): Promise<Message[]> {
		const { data, error } = await supabase.from('Message').select('*');

		if (error) throw new Error(error.message);
		return data!;
	}
}
