import { ResweetDAO } from './resweetDao';
import type { Resweet } from './resweetsType';

export class ResweetService {
	static async createResweet(resweet: Resweet): Promise<Resweet> {
		const keys: (keyof Omit<Resweet, 'resweetId'>)[] = [
			'parentResweetId',
			'sweetId',
			'parentResweetId'
		];
		const count = keys.reduce((acc, key) => {
			return acc + (resweet[key] ? 1 : 0);
		}, 0);

		if (count > 1) {
			throw new Error('Only one of parentCommentId, sweetId, or resweetId should be provided.');
		}

		return await ResweetDAO.insertResweet(resweet);
	}
}
