import { ResweetDAO, type Resweet } from '.';
import type { InteractionIdRequest } from '../interactions';
import { executeWithApiResponse } from '$lib/server/utils/utils';
import type { APIResponse } from '../types/types';

export class ResweetService {
	static async createResweet(resweet: Resweet): Promise<APIResponse<Resweet | null>> {
		return executeWithApiResponse<Resweet>(async () => {
			ResweetService.validateInteractionIdRequest(resweet);

			const resweetId = await ResweetDAO.getResweetByIdRequestAndUid(resweet.uid, resweet);
			if (resweetId) throw new Error('Resweet already exists.');

			return await ResweetDAO.insertResweet(resweet);
		});
	}

	static async deleteResweet(
		uid: string,
		interactionIdRequest: InteractionIdRequest
	): Promise<APIResponse<boolean | null>> {
		return executeWithApiResponse<boolean>(async () => {
			ResweetService.validateInteractionIdRequest(interactionIdRequest);
			const resweetId = await ResweetDAO.getResweetByIdRequestAndUid(uid, interactionIdRequest);

			if (!resweetId) throw new Error('Resweet does not exist.');
			return await ResweetDAO.deleteResweet(resweetId);
		});
	}

	static createInteractionIdRequest(resweet: Resweet): InteractionIdRequest {
		return {
			commentId: resweet.commentId,
			sweetId: resweet.sweetId,
			resweetId: resweet.resweetId
		};
	}

	private static validateInteractionIdRequest(interactionIdRequest: InteractionIdRequest): void {
		let count = 0;
		if (interactionIdRequest.sweetId) count++;
		if (interactionIdRequest.resweetId) count++;
		if (interactionIdRequest.commentId) count++;

		if (count > 1) {
			throw new Error('Only one of sweetId, resweetId, or commentId should be provided.');
		} else if (count === 0) {
			throw new Error('One of sweetId, resweetId, or commentId should be provided.');
		}
	}
}
