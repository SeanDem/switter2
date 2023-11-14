import type { Interaction, InteractionIdRequest } from './interactionType';
import { InteractionDao } from './interationDao';

export class InteractionService {
	static async getcommentsById(interactionRequest: InteractionIdRequest): Promise<Interaction[]> {
		return InteractionDao.getCommentsById(interactionRequest);
	}

	static async getInteractionById(interactionRequest: InteractionIdRequest): Promise<Interaction> {
		return InteractionDao.GetInteractionById(interactionRequest);
	}

	static async getInteractionListById(
		interactionRequest: InteractionIdRequest
	): Promise<Interaction[]> {
		return InteractionDao.GetInteractionListById(interactionRequest);
	}
}
