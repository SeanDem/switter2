import { supabaseService } from '$lib/server/utils/supabaseService';
import type { Sweet } from './sweetType';

export class SweetDao {
	static async createSweet(uid: string, text: string, mediaUrls?: string[]): Promise<Sweet> {
		const { data, error } = await supabaseService
			.from('sweet')
			.insert({ uid, text, media_urls: mediaUrls })
			.single();

		if (error) throw new Error(error.message);
		return data;
	}
}
