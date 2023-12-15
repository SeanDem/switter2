import { supabaseService } from '$lib/server/utils/supabaseService';
import type { Conversation, ConversationDetail } from './conversationType';

export class ConversationDAO {
	static async getConversationListByUid(uid: string): Promise<ConversationDetail[]> {
		const { data, error } = await supabaseService.rpc('getuserconversations', { _uid: uid });
		if (error) throw new Error(error.details + error.message);
		return data!;
	}

	static async createConversation(uid: string, otherUid: string): Promise<Conversation | null> {
		const { data, error } = await supabaseService
			.from('conversation')
			.insert([{ uid_1: uid, uid_2: otherUid }])
			.select('conversation_id, uid_1, uid_2')
			.single<Conversation>();

		console.log(data);
		if (error) throw new Error(error.details + error.message);
		return data;
	}

	static async getConversationByUid(uid1: string, uid2: string): Promise<Conversation | null> {
		const { data, error } = await supabaseService
			.from('conversation')
			.select('conversationId:conversation_id, uid:uid_1, otherUid:uid_2')
			.eq('uid_1', uid1)
			.eq('uid_2', uid2)
			.maybeSingle<Conversation>();

		if (error) throw new Error(error.details + error.message);
		if (!data) return null;
		return data;
	}

	static async getConversationById(conversationId: string): Promise<Conversation | null> {
		const { data, error } = await supabaseService
			.from('conversation')
			.select('conversationId:conversation_id, uid:uid_1, otherUid:uid_2')
			.eq('conversation_id', conversationId)
			.maybeSingle<Conversation>();

		if (error) throw new Error(error.details + error.message);
		if (!data) return null;
		return data;
	}
}
