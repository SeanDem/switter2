import type { InteractionIdRequest } from './../interactions/interactionType';
import { SweetLikesDAO } from './likeDao';
import type { SweetLike } from './likeType';

export class LikeService {
	static async createSweetLike(
		uid: string,
		interactionIdRequest: InteractionIdRequest
	): Promise<void> {
		const interactionRequest: InteractionIdRequest =
			LikeService.buildInteractionRequest(interactionIdRequest);

		let count = 0;
		if (interactionIdRequest.sweetId) count++;
		if (interactionIdRequest.resweetId) count++;
		if (interactionIdRequest.commentId) count++;
		if (count > 1) {
			throw new Error('Only one of parentCommentId, sweetId, or resweetId should be provided.');
		} else if (count === 0) {
			throw new Error('One of parentCommentId, sweetId, or resweetId should be provided.');
		}

		const isLiked = await SweetLikesDAO.isLiked(uid, interactionRequest);
		if (isLiked) return Promise.resolve();

		await SweetLikesDAO.insertSweetLike(uid, interactionIdRequest); // Assuming sweetLike is meant to be interactionIdRequest
	}

	static async deleteSweetLike(
		uid: string,
		interactionIdRequest: InteractionIdRequest
	): Promise<void> {
		const interactionRequest: InteractionIdRequest =
			LikeService.buildInteractionRequest(interactionIdRequest);

		let count = 0;
		if (interactionIdRequest.sweetId) count++;
		if (interactionIdRequest.resweetId) count++;
		if (interactionIdRequest.commentId) count++;
		if (count > 1) {
			throw new Error('Only one of parentCommentId, sweetId, or resweetId should be provided.');
		} else if (count === 0) {
			throw new Error('One of parentCommentId, sweetId, or resweetId should be provided.');
		}
		const isLiked = await SweetLikesDAO.isLiked(uid, interactionRequest);
		if (!isLiked) return Promise.resolve();

		await SweetLikesDAO.deleteSweetLike(uid, interactionRequest);
	}

	static buildInteractionRequest(sweetLike: InteractionIdRequest): InteractionIdRequest {
		return {
			commentId: sweetLike.commentId,
			sweetId: sweetLike.sweetId,
			resweetId: sweetLike.resweetId
		};
	}
}
