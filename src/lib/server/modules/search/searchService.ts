import { executeWithApiResponse } from '$lib/server/ServerUtils/utils';
import type { Interaction } from '../interactions';
import type { APIResponse } from '../types/types';
import { SearchDao } from './searchDao';
import type { InteractionSearchRequest } from './searchType';

export class SearchService {
	static async searchInteractionText(
		uid: string,
		interactionSearchRequest: InteractionSearchRequest
	): Promise<APIResponse<Interaction[] | null>> {
		return await executeWithApiResponse(() =>
			SearchDao.searchInteractionText(uid, interactionSearchRequest)
		);
	}
}
