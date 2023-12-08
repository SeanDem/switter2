import { supabase } from '$lib/utils/supabaseClient';
import type { LikesList } from '../likes';
import type { Interaction, InteractionIdRequest, InteractionType } from './interactionType';

export class InteractionDao {
	static async getCommentsById(
		uid: string,
		{
			sweetId: _sweet_id = null,
			commentId: _comment_id = null,
			resweetId: _resweet_id = null
		}: InteractionIdRequest
	): Promise<Interaction[]> {
		const { data, error } = await supabase.rpc('getcommentsbyid', {
			_uid: uid,
			_sweet_id,
			_comment_id,
			_resweet_id
		});
		if (error) throw new Error(error.message);
		return data!;
	}

	static async GetInteractionById(
		uid: string,
		{
			sweetId: _sweet_id = null,
			commentId: _comment_id = null,
			resweetId: _resweet_id = null
		}: InteractionIdRequest
	): Promise<Interaction> {
		const { data, error } = await supabase.rpc('getinteractionbyid', {
			_uid: uid,
			_sweet_id,
			_comment_id,
			_resweet_id
		});
		if (error) throw new Error(error.details + error.message + error.hint);
		return data![0];
	}
	static async GetInteractionsByIdList(uid: string, likes: LikesList): Promise<Interaction[]> {
		const { data, error } = await supabase.rpc('getinteractionbyids', {
			_uid: uid,
			_sweet_ids: likes.sweets,
			_comment_ids: likes.comments,
			_resweet_ids: likes.resweets
		});

		if (error) {
			throw new Error(error.details + error.message + error.hint);
		}

		return data!;
	}

	static async GetInteractionListByType(
		uid: string,
		interactionType: InteractionType
	): Promise<Interaction[]> {
		const { data, error } = await supabase.rpc('getinteractionlistbytype', {
			_uid: uid,
			_type: interactionType
		});
		if (error) throw new Error(error.details + error.message + error.hint);
		return data!;
	}

	static async getInteractionListByTypeAndUid(
		uid: string,
		interactionType: InteractionType,
		searchUid: string
	): Promise<Interaction[]> {
		const { data, error } = await supabase.rpc('getinteractionlistbytypeanduid', {
			_uid: uid,
			_type: interactionType,
			_search_uid: searchUid
		});
		if (error) throw new Error(error.details + error.message + error.hint);
		return data!;
	}
}
