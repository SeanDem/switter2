import { badWordFilter } from '$lib/server/utils/badWords';
import { executeWithApiResponse } from '$lib/server/utils/utils';
import { SweetDao, type Sweet } from '.';
import type { APIResponse } from '../types/types';

export class SweetService {
	static async createSweet(
		uid: string,
		text: string,
		mediaUrls?: string[]
	): Promise<APIResponse<Sweet | null>> {
		return executeWithApiResponse<Sweet>(async () => {
			text = badWordFilter.clean(text.trim());
			return await SweetDao.createSweet(uid, text, mediaUrls);
		});
	}
}
