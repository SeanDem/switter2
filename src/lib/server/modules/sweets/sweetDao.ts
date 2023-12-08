import { supabase } from '$lib/utils/supabaseClient';
import type { Sweet } from './sweetType';

export class SweetDao {
	static async createSweet(uid: string, text: string, mediaUrls?: string[]): Promise<Sweet> {
		const { data, error } = await supabase
			.from('sweet')
			.insert({ uid, text, media_urls: mediaUrls })
			.single();

		if (error) throw new Error(error.message);
		return data;
	}
}
