import { executeWithApiResponse } from '$lib/server/utils/utils';
import { LikeService } from '../likes';
import type { APIResponse } from '../types/types';
import type { Interaction, InteractionIdRequest, InteractionType } from './interactionType';
import { InteractionDao } from './interationDao';

export class InteractionService {
	static async getCommentsById(
		uid: string,
		interactionRequest: InteractionIdRequest
	): Promise<APIResponse<Interaction[] | null>> {
		return executeWithApiResponse(async () => {
			return await InteractionDao.getCommentsById(uid, interactionRequest);
		});
	}

	static async getInteractionById(
		uid: string,
		interactionRequest: InteractionIdRequest
	): Promise<APIResponse<Interaction | null>> {
		return executeWithApiResponse(async () => {
			return await InteractionDao.GetInteractionById(uid, interactionRequest);
		});
	}

	static async getAllLikedInteractions(
		uid: string,
		searchUid: string
	): Promise<APIResponse<Interaction[] | null>> {
		return executeWithApiResponse(async () => {
			const allLikesRes = await LikeService.getAllLikesByUid(searchUid);
			const likes = allLikesRes.data;
			if (!likes) return null;
			return await InteractionDao.GetInteractionsByIdList(uid, likes);
		});
	}

	static async getInteractionListByType(
		uid: string,
		interactionType: InteractionType
	): Promise<APIResponse<Interaction[] | null>> {
		return executeWithApiResponse(async () => {
			return await InteractionDao.GetInteractionListByType(uid, interactionType);
		});
	}

	static async getInteractionListByTypeAndUid(
		uid: string,
		interaction: InteractionType,
		searchUid: string
	): Promise<APIResponse<Interaction[] | null>> {
		return executeWithApiResponse(async () => {
			return await InteractionDao.getInteractionListByTypeAndUid(uid, interaction, searchUid);
		});
	}
}
