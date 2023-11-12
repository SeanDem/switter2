import { supabase } from '$lib/supabaseClient';
import type { PostgrestResponse } from '@supabase/supabase-js';
import type { Sweet, SweetDetail } from './sweetType';

export class SweetDao {
	static async createSweet(uid: string, text: string, mediaUrls?: string[]): Promise<Sweet> {
		const { data, error } = await supabase
			.from('sweet')
			.insert({ uid, text, media_urls: mediaUrls })
			.single();

		if (error) throw error;
		return data;
	}

	static async getSweetById(sweetId: string): Promise<Sweet | null> {
		const { data, error } = await supabase
			.from('sweet')
			.select('*')
			.eq('sweet_id', sweetId)
			.single();

		if (error) throw error;
		return data;
	}
	static async getSweetsByUid(uid: string): Promise<Sweet[] | null> {
		const { data, error } = await supabase.from('sweet').select('*').eq('uid', uid);

		if (error) throw error;
		return data;
	}

	static async updateSweet(
		sweetId: string,
		newText: string,
		newMediaUrls: string[]
	): Promise<Sweet> {
		const { data, error } = await supabase
			.from('sweet')
			.update({ text: newText, media_urls: newMediaUrls })
			.eq('sweet_id', sweetId)
			.single();

		if (error) throw error;
		return data;
	}

	static async deleteSweet(sweetId: string): Promise<PostgrestResponse<Sweet>> {
		const { data, error } = await supabase.from('sweet').delete().eq('sweet_id', sweetId);

		if (error) throw error;
		return data!;
	}
	static async getAllSweets(): Promise<Sweet[]> {
		const { data, error } = await supabase.from('sweet').select('*');

		if (error) throw error;
		return data;
	}

	static async getSweetWithUserProfile(sweetId: string): Promise<any> {
		const { data, error } = await supabase
			.from('Sweet')
			.select(
				`
				sweet_id,
				uid,
				timestamp,
				type,
				text,
				media_urls,
				userProfile (handle, bio, profile_url)
				`
			)
			.eq('sweet_id', sweetId)
			.single();

		if (error) throw error;
		return data;
	}

	static async getSweetDetails(): Promise<any> {
		const { data, error } = await supabase.rpc('getsweetdetails');
		if (error) throw error;
		return data;
	}
}
