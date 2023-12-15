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
			.select('*')
			.single<ConversationResponse>();

		console.log(data);
		if (error) throw new Error(error.details + error.message);
		return { conversationId: data.conversation_id, uid: data.uid_1, otherUid: data.uid_2 };
	}

	static async getConversationByUid(uid1: string, uid2: string): Promise<Conversation | null> {
		const { data, error } = await supabaseService
			.from('conversation')
			.select('*')
			.eq('uid_1', uid1)
			.eq('uid_2', uid2)
			.maybeSingle<ConversationResponse>();

		if (error) throw new Error(error.details + error.message);
		if (!data) return null;
		return { conversationId: data.conversation_id, uid: data.uid_1, otherUid: data.uid_2 };
	}
	static async getConversationById(conversationId: string): Promise<Conversation | null> {
		const { data, error } = await supabaseService
			.from('conversation')
			.select('*')
			.eq('conversation_id', conversationId)
			.maybeSingle<ConversationResponse>();

		if (error) throw new Error(error.details + error.message);
		if (!data) return null;
		return { conversationId: data.conversation_id, uid: data.uid_1, otherUid: data.uid_2 };
	}
}
interface ConversationResponse {
	conversation_id: string;
	uid_1: string;
	uid_2: string;
}
