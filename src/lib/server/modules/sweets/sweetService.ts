import { badWordFilter } from '$lib/server/utils/badWords';
import { SweetDao, type Sweet } from '.';
import type { Interaction } from '../interactions';

export class SweetService {
	static async createSweet(uid: string, text: string, mediaUrls?: string[]): Promise<Sweet> {
		text = badWordFilter.clean(text.trim());
		return SweetDao.createSweet(uid, text, mediaUrls);
	}
}
