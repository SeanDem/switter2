import { supabase } from '$lib/supabaseClient';
import type { Interaction, InteractionIdRequest, InteractionType } from './interactionType';

export class InteractionDao {
	static async getCommentsById({
		sweetId: _sweet_id = null,
		commentId: _comment_id = null,
		resweetId: _resweet_id = null
	}: InteractionIdRequest): Promise<Interaction[]> {
		const { data, error } = await supabase.rpc('getcommentsbyid', {
			_sweet_id,
			_comment_id,
			_resweet_id
		});
		if (error) throw new Error(error.message);
		return data!;
	}

	static async GetInteractionById({
		sweetId: _sweet_id = null,
		commentId: _comment_id = null,
		resweetId: _resweet_id = null
	}: InteractionIdRequest): Promise<Interaction> {
		console.log('GetInteractionById: ', _sweet_id, _comment_id, _resweet_id);
		const { data, error } = await supabase.rpc('getinteractionbyid', {
			_sweet_id,
			_comment_id,
			_resweet_id
		});
		if (error) throw new Error(error.details + error.message + error.hint);
		return data![0];
	}

	static async GetInteractionListByType(interactionType: InteractionType): Promise<Interaction[]> {
		const { data, error } = await supabase.rpc('getinteractionlistbytype', {
			_type: interactionType
		});
		if (error) throw new Error(error.details + error.message + error.hint);
		return data!;
	}

	static async getInteractionListByTypeAndUid(
		interactionType: InteractionType,
		uid: string
	): Promise<Interaction[]> {
		const { data, error } = await supabase.rpc('getinteractionlistbytypeanduid', {
			_type: interactionType,
			_uid: uid
		});
		if (error) throw new Error(error.details + error.message + error.hint);
		return data!;
	}
}
