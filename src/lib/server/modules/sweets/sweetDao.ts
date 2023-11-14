import { supabase } from '$lib/supabaseClient';
import type { PostgrestResponse } from '@supabase/supabase-js';
import type { IdTypeRequest } from '../types/types';
import type { Sweet } from './sweetType';
import type { Interaction } from '../interactions';

export class SweetDao {
	static async createSweet(uid: string, text: string, mediaUrls?: string[]): Promise<Sweet> {
		const { data, error } = await supabase
			.from('sweet')
			.insert({ uid, text, media_urls: mediaUrls })
			.single();

		if (error) throw new Error(error.message);
		return data;
	}

	static async getSweetById(sweetId: string): Promise<Sweet | null> {
		const { data, error } = await supabase
			.from('sweet')
			.select('*')
			.eq('sweet_id', sweetId)
			.single();

		if (error) throw new Error(error.message);
		return data;
	}
	static async getSweetsByUid(uid: string): Promise<Sweet[] | null> {
		const { data, error } = await supabase.from('sweet').select('*').eq('uid', uid);

		if (error) throw new Error(error.message);
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

		if (error) throw new Error(error.message);
		return data;
	}

	static async deleteSweet(sweetId: string): Promise<PostgrestResponse<Sweet>> {
		const { data, error } = await supabase.from('sweet').delete().eq('sweet_id', sweetId);

		if (error) throw new Error(error.message);
		return data!;
	}
	static async getAllSweets(): Promise<Sweet[]> {
		const { data, error } = await supabase.from('sweet').select('*');

		if (error) throw new Error(error.message);
		return data;
	}

	static async getSweetDetails(): Promise<Interaction[]> {
		const { data, error } = await supabase.rpc('getallsweets');
		if (error) throw new Error(error.message);
		return data;
	}

	static async getActionbyId({
		_sweet_id = null,
		_comment_id = null,
		_resweet_id = null
	}: IdTypeRequest): Promise<Interaction> {
		const { data, error } = await supabase.rpc('getactionbyid', {
			_sweet_id,
			_comment_id,
			_resweet_id
		});
		if (error) throw new Error(error.message);
		return data[0];
	}
}
