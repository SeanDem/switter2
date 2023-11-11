import { supabase } from '$lib/supabaseClient';
import type { SweetLike } from './likeType';

export class SweetLikesDAO {
	static async createSweetLike(sweetLike: Omit<SweetLike, 'like_id'>): Promise<SweetLike> {
		const { data, error } = await supabase.from('SweetLikes').insert([sweetLike]);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async getSweetLikeById(like_id: string): Promise<SweetLike | null> {
		const { data, error } = await supabase
			.from('SweetLikes')
			.select('*')
			.eq('like_id', like_id)
			.single();

		if (error) throw new Error(error.message);
		return data;
	}

	static async updateSweetLike(
		like_id: string,
		sweetLikeUpdates: Partial<SweetLike>
	): Promise<SweetLike> {
		const { data, error } = await supabase
			.from('SweetLikes')
			.update(sweetLikeUpdates)
			.eq('like_id', like_id);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async deleteSweetLike(like_id: string): Promise<boolean> {
		const { error } = await supabase.from('SweetLikes').delete().eq('like_id', like_id);

		if (error) throw new Error(error.message);
		return true;
	}

	static async getAllSweetLikes(): Promise<SweetLike[]> {
		const { data, error } = await supabase.from('SweetLikes').select('*');

		if (error) throw new Error(error.message);
		return data!;
	}
}
