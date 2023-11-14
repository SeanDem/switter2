import { supabase } from '$lib/supabaseClient';
import type { Interaction, InteractionIdRequest } from './interactionType';

export class InteractionDao {
	static async getCommentsById({
		_sweet_id = null,
		_comment_id = null,
		_resweet_id = null
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
		_sweet_id = null,
		_comment_id = null,
		_resweet_id = null
	}: InteractionIdRequest): Promise<Interaction> {
		const { data, error } = await supabase.rpc('getinteractionbyid', {
			_sweet_id,
			_comment_id,
			_resweet_id
		});
		if (error) throw new Error(error.details + error.message + error.hint);
		return data![0];
	}

	static async GetInteractionListById({
		_sweet_id = null,
		_comment_id = null,
		_resweet_id = null
	}: InteractionIdRequest): Promise<Interaction[]> {
		const { data, error } = await supabase.rpc('getinteractionlistbyid', {
			_sweet_id,
			_comment_id,
			_resweet_id
		});
		if (error) throw new Error(error.details + error.message + error.hint);
		return data!;
	}
}
