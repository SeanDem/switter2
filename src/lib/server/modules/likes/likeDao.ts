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

	static async deleteSweetLikeById(likeId: string): Promise<boolean> {
		const { data, error } = await supabase.from('sweetlike').delete().match({ like_id: likeId }); // Use match() to specify the row to delete

		if (error) throw new Error(error?.details + error?.message + error?.hint);
		return true;
	}

	static async getSweetLikeByUidAndIdTypeRequest(
		uid: string,
		idTypeRequest: InteractionIdRequest
	): Promise<string | null> {
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
			.select('sweet_id')
			.eq('uid', uid)
			.or(queryCondition);

		if (error) throw new Error(error.details + error.message + error.hint);
		if (data && data.length > 0) return data[0].sweet_id;
		return null;
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
