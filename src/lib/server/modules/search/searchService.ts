import type { Interaction } from '../interactions';
import { SearchDao } from './searchDao';
import type { InteractionSearchRequest } from './searchType';

export class SearchService {
	static async searchInteractionText(
		interactionSearchRequest: InteractionSearchRequest
	): Promise<Interaction[]> {
		return await SearchDao.searchInteractionText(interactionSearchRequest);
	}
}
