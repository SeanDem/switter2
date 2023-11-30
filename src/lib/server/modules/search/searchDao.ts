import { supabase } from '$lib/supabaseClient';
import { e } from 'vitest/dist/index-5aad25c1';
import type { InteractionSearchRequest } from '.';
import type { Interaction } from '../interactions';

export class SearchDao {
	static async searchInteractionText(
		uid: string,
		interactionSearchRequest: InteractionSearchRequest
	): Promise<Interaction[]> {
		const _uid = uid;
		const _search_text = `%${interactionSearchRequest.searchText}%`;
		const _type = interactionSearchRequest.interactionType;
		const { data, error } = await supabase.rpc('getinteractionsbytext', {
			_uid,
			_search_text,
			_type
		});
		if (error) throw new Error(error.message + error.hint + error.details);
		return data;
	}
}
