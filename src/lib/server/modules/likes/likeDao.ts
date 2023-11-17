import { supabase } from '$lib/supabaseClient';
import type { InteractionIdRequest } from '../interactions';
import type { SweetLike } from './likeType';

export class SweetLikesDAO {
	static async insertSweetLike(
		uid: string,
		interactionIdRequest: InteractionIdRequest
	): Promise<SweetLike> {
		const sweetLike: SweetLike = {
			uid,
			...this.mapInteractionRequestToSnakeCase(interactionIdRequest)
		};
		console.log(sweetLike);
		const { data, error } = await supabase.from('sweetlike').insert([sweetLike]);

		if (error) throw new Error(error.message);
		return data!;
	}

	static async isLiked(uid: string, idTypeRequest: InteractionIdRequest): Promise<boolean> {
		let conditions = [];
		if (idTypeRequest.commentId) conditions.push(`comment_id.eq.${idTypeRequest.commentId}`);
		if (idTypeRequest.sweetId) conditions.push(`sweet_id.eq.${idTypeRequest.sweetId}`);
		if (idTypeRequest.resweetId) conditions.push(`resweet_id.eq.${idTypeRequest.resweetId}`);

		if (conditions.length === 0) {
			throw new Error('No valid ID provided in IdTypeDaoRequest object.');
		}

		const queryCondition = conditions.join(',');

		const { data, error } = await supabase
			.from('sweetlike')
			.select('*')
			.eq('uid', uid)
			.or(queryCondition);

		if (error) throw new Error(error.details + error.message + error.hint);

		return data.length > 0;
	}

	static async deleteSweetLike(uid: string, idTypeRequest: InteractionIdRequest): Promise<null> {
		let conditions = [];
		if (idTypeRequest.commentId) conditions.push(`comment_id.eq.${idTypeRequest.commentId}`);
		if (idTypeRequest.sweetId) conditions.push(`sweet_id.eq.${idTypeRequest.sweetId}`);
		if (idTypeRequest.resweetId) conditions.push(`resweet_id.eq.${idTypeRequest.resweetId}`);

		if (conditions.length === 0) {
			throw new Error('No valid ID provided in IdTypeDaoRequest object.');
		}

		const queryCondition = conditions.join(',');

		const { data, error } = await supabase
			.from('sweetlike')
			.delete()
			.eq('uid', uid)
			.or(queryCondition);

		if (error) throw new Error(error?.details + error?.message + error?.hint);

		return data;
	}

	static async deleteSweetLikeById(likeId: string): Promise<boolean> {
		const like_id = likeId;
		const { error } = await supabase.from('sweetlike').delete().eq('like_id', like_id);

		if (error) throw new Error(error.message);
		return true;
	}
	static mapInteractionRequestToSnakeCase(interactionRequest: InteractionIdRequest) {
		return {
			resweet_id: interactionRequest.resweetId,
			sweet_id: interactionRequest.sweetId,
			comment_id: interactionRequest.resweetId
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
