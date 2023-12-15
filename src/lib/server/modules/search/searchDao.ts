import { supabaseService } from '$lib/server/utils/supabaseService';
import type { InteractionSearchRequest } from '.';
import type { Interaction } from '../interactions';
import type { UserProfile } from '../userProfile';

export class SearchDao {
	static async searchInteractionText(
		uid: string,
		interactionSearchRequest: InteractionSearchRequest
	): Promise<Interaction[]> {
		const _uid = uid;
		const _search_text = `%${interactionSearchRequest.searchText}%`;
		const _type = interactionSearchRequest.interactionType;
		const { data, error } = await supabaseService.rpc('getinteractionsbytext', {
			_uid,
			_search_text,
			_type
		});
		if (error) throw new Error(error.message + error.hint + error.details);
		return data;
	}

	static async searchUserProfileByName(name: string): Promise<UserProfile[] | null> {
		const { data, error } = await supabaseService
			.from('userprofile')
			.select('uid, handle, bio, name, profileUrl:profile_url, birthday, phone, email')
			.ilike('name', `%${name}%`);

		if (error) throw new Error(error.details + error.message + error.hint);
		return data;
	}
	static async searchUserProfileByHandle(handle: string): Promise<UserProfile[] | null> {
		const { data, error } = await supabaseService
			.from('userprofile')
			.select('uid, handle, bio, name, profileUrl:profile_url, birthday, phone, email')
			.ilike('handle', `%${handle}%`);

		if (error) throw new Error(error.details + error.message + error.hint);
		return data;
	}
}
