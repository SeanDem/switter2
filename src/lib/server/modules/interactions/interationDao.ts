import { supabaseService } from '$lib/server/utils/supabaseService';
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
		const { data, error } = await supabaseService.rpc('getcommentsbyid', {
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
		const { data, error } = await supabaseService.rpc('getinteractionbyid', {
			_uid: uid,
			_sweet_id,
			_comment_id,
			_resweet_id
		});
		if (error) throw new Error(error.details + error.message + error.hint);
		return data![0];
	}
	static async GetInteractionsByIdList(uid: string, likes: LikesList): Promise<Interaction[]> {
		const { data, error } = await supabaseService.rpc('getinteractionbyids', {
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

	static async GetInteractionList(uid: string): Promise<Interaction[]> {
		const { data, error } = await supabaseService.rpc('getallinteractionlist', {
			_uid: uid
		});
		if (error) throw new Error(error.details + error.message + error.hint);
		return data!;
	}

	static async getInteractionListByTypeAndUid(
		uid: string,
		interactionType: InteractionType,
		searchUid: string
	): Promise<Interaction[]> {
		const { data, error } = await supabaseService.rpc('getinteractionlistbytypeanduid', {
			_uid: uid,
			_type: interactionType,
			_search_uid: searchUid
		});
		if (error) throw new Error(error.details + error.message + error.hint);
		return data!;
	}

	static async GetInteractionListByTypeAndFollowing(uid: string): Promise<Interaction[]> {
		const { data, error } = await supabaseService.rpc('getinteractionlistbyfollowing', {
			_uid: uid
		});
		if (error) throw new Error(error.details + error.message + error.hint);
		return data!;
	}
}
