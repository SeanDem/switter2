import type { Interaction, InteractionIdRequest, InteractionType } from './interactionType';
import { InteractionDao } from './interationDao';

export class InteractionService {
	static async getCommentsById(interactionRequest: InteractionIdRequest): Promise<Interaction[]> {
		return InteractionDao.getCommentsById(interactionRequest);
	}

	static async getInteractionById(interactionRequest: InteractionIdRequest): Promise<Interaction> {
		return InteractionDao.GetInteractionById(interactionRequest);
	}

	static async getInteractionListByType(interactionType: InteractionType): Promise<Interaction[]> {
		return InteractionDao.GetInteractionListByType(interactionType);
	}
	static async getInteractionListByTypeAndUid(
		interaction: InteractionType,
		uid: string
	): Promise<Interaction[]> {
		return InteractionDao.getInteractionListByTypeAndUid(interaction, uid);
	}
}
