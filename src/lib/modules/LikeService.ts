import type { InteractionIdRequest } from '$lib/server/modules/interactions';
import type { APIResponse } from '$lib/server/modules/types/types';
import { ClientLikeDao } from './LikeDao';

export class ClientLikeService {
	static async createSweetLike(
		uid: string,
		interactionIdRequest: InteractionIdRequest
	): Promise<APIResponse<boolean | null>> {
		return executeWithApiResponse<boolean>(async () => {
			ClientLikeService.validateInteractionIdRequest(interactionIdRequest);

			const likeId = await ClientLikeDao.getSweetLikeByUidAndIdTypeRequest(
				uid,
				interactionIdRequest
			);

			if (!likeId) {
				const insertResult = await ClientLikeDao.insertSweetLike(uid, interactionIdRequest);
				return !!insertResult;
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
			ClientLikeService.validateInteractionIdRequest(interactionIdRequest);

			const likeId = await ClientLikeDao.getSweetLikeByUidAndIdTypeRequest(
				uid,
				interactionIdRequest
			);

			if (likeId) {
				return await ClientLikeDao.deleteSweetLikeById(likeId);
			} else {
				throw new Error('No like found.');
			}
		});
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

export async function executeWithApiResponse<T>(
	func: () => Promise<T>
): Promise<APIResponse<T | null>> {
	try {
		const data = await func();
		return { data, status: HttpStatus.OK, message: 'Success' };
	} catch (error: any) {
		console.error(error);
		return {
			data: null,
			status: HttpStatus.InternalServerError,
			message: error.message
		};
	}
}

enum HttpStatus {
	OK = 200,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	InternalServerError = 500
}
