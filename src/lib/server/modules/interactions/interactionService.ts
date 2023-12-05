import { LikeService } from '../likes';
import type {
	Interaction,
	InteractionIdRequest,
	InteractionIdsListRequest,
	InteractionType
} from './interactionType';
import { InteractionDao } from './interationDao';

export class InteractionService {
	static async getCommentsById(
		uid: string,
		interactionRequest: InteractionIdRequest
	): Promise<Interaction[]> {
		return InteractionDao.getCommentsById(uid, interactionRequest);
	}

	static async getInteractionById(
		uid: string,
		interactionRequest: InteractionIdRequest
	): Promise<Interaction> {
		return InteractionDao.GetInteractionById(uid, interactionRequest);
	}

	static async getAllLikedInteractions(uid: string, searchUid: string): Promise<Interaction[]> {
		const likes = await LikeService.getAllLikesByUid(searchUid);
		return InteractionDao.GetInteractionsByIdList(uid, likes);
	}

	static async getInteractionListByType(
		uid: string,
		interactionType: InteractionType
	): Promise<Interaction[]> {
		const res = InteractionDao.GetInteractionListByType(uid, interactionType);
		return res;
	}
	static async getInteractionListByTypeAndUid(
		uid: string,
		interaction: InteractionType,
		searchUid: string
	): Promise<Interaction[]> {
		const res = InteractionDao.getInteractionListByTypeAndUid(uid, interaction, searchUid);
		return res;
	}
}
