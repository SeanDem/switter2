import { executeSafe, executeWithApiResponse } from '$lib/server/utils/utils';
import type { Interaction } from '../interactions';
import type { APIResponse } from '../types/types';
import type { UserProfile } from '../userProfile';
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

	static async combinedSearchUserProfiles(name: string, handle: string): Promise<UserProfile[]> {
		const [nameResults, handleResults] = await Promise.all([
			SearchDao.searchUserProfileByName(name),
			SearchDao.searchUserProfileByHandle(handle)
		]);

		const combinedResults = new Map<string, UserProfile>();

		[handleResults, nameResults].forEach((profiles) => {
			profiles?.forEach((profile) => combinedResults.set(profile.uid, profile));
		});

		return Array.from(combinedResults.values());
	}
}
