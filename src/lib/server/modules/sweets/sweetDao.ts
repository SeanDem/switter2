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

	static async getSweetDetails(): Promise<SweetDetail[]> {
		const { data, error } = await supabase.rpc('getsweetdetails');
		if (error) throw error;
		return data;
	}

	static async getSweetDetailsById(sweetId: string): Promise<any> {
		console.log(sweetId);
		const { data, error } = await supabase.rpc('getsweetdetailsbyid', { _sweet_id: sweetId });
		console.log(data);
		if (error) throw error;
		return data;
	}
}
