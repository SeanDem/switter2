import { supabase } from '$lib/supabaseClient';
import type { SweetLike } from './likeType';

export class SweetLikesDAO {
	static async insertSweetLike(
		sweetLike: Omit<SweetLike, 'like_id' | 'timestamp'>
	): Promise<SweetLike> {
		const sweetLikeTable = this.mapResweetToSnakeCase(sweetLike);
		const { data, error } = await supabase.from('sweetlikes').insert([sweetLikeTable]);

		if (error) throw new Error(error.message);
		return data!;
	}
	static async deleteSweetLike(likeId: string): Promise<boolean> {
		const like_id = likeId;
		const { error } = await supabase.from('sweetlikes').delete().eq('like_id', like_id);

		if (error) throw new Error(error.message);
		return true;
	}
	static mapResweetToSnakeCase(like: SweetLike): SweetLikeTable {
		return {
			uid: like.uid,
			resweet_id: like.resweetId,
			sweet_id: like.sweetId,
			comment_id: like.resweetId
		};
	}
}

type SweetLikeTable = {
	uid: string;
	like_id?: string | null;
	timestamp?: Date | null;
	sweet_id?: string | null;
	comment_id?: string | null;
	resweet_id?: string | null;
};
