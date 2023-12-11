import { supabaseService } from '$lib/server/utils/supabaseService';
import type { InteractionIdRequest } from '../interactions';
import type { LikesList, SweetLike } from './likeType';

export class SweetLikesDAO {
	static async insertSweetLike(
		uid: string,
		interactionIdRequest: InteractionIdRequest
	): Promise<SweetLike> {
		const sweetLike: SweetLike = {
			uid,
			...this.mapInteractionRequestToSnakeCase(interactionIdRequest)
		};
		const { data, error } = await supabaseService.from('sweetlike').insert([sweetLike]);
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

		const { data, error } = await supabaseService
			.from('sweetlike')
			.select('*')
			.eq('uid', uid)
			.or(queryCondition);

		if (error) throw new Error(error.details + error.message + error.hint);
		return data.length > 0;
	}

	static async deleteSweetLikeById(likeId: string): Promise<boolean> {
		const { data, error } = await supabaseService
			.from('sweetlike')
			.delete()
			.match({ like_id: likeId });
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
		const { data, error } = await supabaseService
			.from('sweetlike')
			.select('like_id')
			.eq('uid', uid)
			.or(queryCondition);

		if (error) throw new Error(error.details + error.message + error.hint);
		if (data && data.length > 0) return data[0].like_id;
		return null;
	}
	static async fetchAllLikesByUid(uid: string): Promise<LikesList> {
		try {
			const { data: likes, error } = await supabaseService
				.from('sweetlike')
				.select('sweet_id, comment_id, resweet_id')
				.eq('uid', uid);

			if (error) throw error;
			//need to fix and simplify logic, sql function is more complicated then it needs to be
			let sweetLikes = likes.filter((like) => like.sweet_id !== null).map((like) => like.sweet_id);
			let commentLikes = likes
				.filter((like) => like.comment_id !== null)
				.map((like) => like.comment_id);
			let resweetLikes = likes
				.filter((like) => like.resweet_id !== null)
				.map((like) => like.resweet_id);

			return {
				sweets: sweetLikes,
				comments: commentLikes,
				resweets: resweetLikes
			};
		} catch (error) {
			console.error('Error fetching likes:', error);
			throw error;
		}
	}

	static mapInteractionRequestToSnakeCase(interactionRequest: InteractionIdRequest) {
		return {
			resweet_id: interactionRequest.resweetId,
			sweet_id: interactionRequest.sweetId,
			comment_id: interactionRequest.commentId
		};
	}
}
