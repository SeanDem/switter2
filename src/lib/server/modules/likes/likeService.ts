import type { LikesList } from '.';
import type { InteractionIdRequest } from './../interactions/interactionType';
import { SweetLikesDAO } from './likeDao';

export class LikeService {
	static async createSweetLike(
		uid: string,
		interactionIdRequest: InteractionIdRequest
	): Promise<void> {
		LikeService.validateInteractionIdRequest(interactionIdRequest);

		const likeId = await SweetLikesDAO.getSweetLikeByUidAndIdTypeRequest(uid, interactionIdRequest);

		if (likeId) return Promise.resolve();
		await SweetLikesDAO.insertSweetLike(uid, interactionIdRequest);
	}

	static async deleteSweetLike(
		uid: string,
		interactionIdRequest: InteractionIdRequest
	): Promise<void> {
		LikeService.validateInteractionIdRequest(interactionIdRequest);

		const likeId = await SweetLikesDAO.getSweetLikeByUidAndIdTypeRequest(uid, interactionIdRequest);

		if (!likeId) return Promise.resolve();
		await SweetLikesDAO.deleteSweetLikeById(likeId);
	}

	static buildInteractionRequest(sweetLike: InteractionIdRequest): InteractionIdRequest {
		return {
			commentId: sweetLike.commentId,
			sweetId: sweetLike.sweetId,
			resweetId: sweetLike.resweetId
		};
	}
	static getAllLikesByUid(uid: string): Promise<LikesList> {
		return SweetLikesDAO.fetchAllLikesByUid(uid);
	}
	private static validateInteractionIdRequest(interactionIdRequest: InteractionIdRequest): void {
		let count = 0;
		if (interactionIdRequest.sweetId) count++;
		if (interactionIdRequest.resweetId) count++;
		if (interactionIdRequest.commentId) count++;

		if (count > 1) {
			throw new Error('Only one of parentCommentId, sweetId, or resweetId should be provided.');
		} else if (count === 0) {
			throw new Error('No parentCommentId, sweetId, or resweetId provided.');
		}
	}
}
