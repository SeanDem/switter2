import { executeWithApiResponse } from '$lib/server/utils/utils';
import type { InteractionIdRequest } from '../interactions';
import type { APIResponse } from '../types/types';
import { SweetLikesDAO } from './likeDao';
import type { LikesList, SweetLike } from './likeType';

export class LikeService {
	static async createSweetLike(
		uid: string,
		interactionIdRequest: InteractionIdRequest
	): Promise<APIResponse<SweetLike | null>> {
		return executeWithApiResponse<SweetLike>(async () => {
			LikeService.validateInteractionIdRequest(interactionIdRequest);

			const likeId = await SweetLikesDAO.getSweetLikeByUidAndIdTypeRequest(
				uid,
				interactionIdRequest
			);

			if (!likeId) {
				const insertResult = await SweetLikesDAO.insertSweetLike(uid, interactionIdRequest);
				return insertResult;
			} else {
				throw new Error('Liked already exists.');
			}
		});
	}

	static async deleteSweetLike(
		uid: string,
		interactionIdRequest: InteractionIdRequest
	): Promise<APIResponse<boolean | null>> {
		return executeWithApiResponse<boolean | null>(async () => {
			LikeService.validateInteractionIdRequest(interactionIdRequest);

			const likeId = await SweetLikesDAO.getSweetLikeByUidAndIdTypeRequest(
				uid,
				interactionIdRequest
			);

			if (likeId) {
				return await SweetLikesDAO.deleteSweetLikeById(likeId);
			} else {
				throw new Error('No like found.');
			}
		});
	}

	static async getAllLikesByUid(uid: string): Promise<APIResponse<LikesList | null>> {
		return executeWithApiResponse<LikesList>(() => SweetLikesDAO.fetchAllLikesByUid(uid));
	}

	private static validateInteractionIdRequest(interactionIdRequest: InteractionIdRequest): void {
		let count = 0;
		if (interactionIdRequest.sweetId) count++;
		if (interactionIdRequest.resweetId) count++;
		if (interactionIdRequest.commentId) count++;

		if (count > 1) {
			throw new Error('Only one of sweetId, resweetId, or commentId should be provided.');
		} else if (count === 0) {
			throw new Error('No sweetId, resweetId, or commentId provided.');
		}
	}
}
