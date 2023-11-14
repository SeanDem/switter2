import { SweetLikesDAO } from './likeDao';
import type { SweetLike } from './likeType';

export class LikeService {
	static async createSweetLike(sweetLike: SweetLike): Promise<SweetLike> {
		const keys: (keyof Omit<SweetLike, 'likeId'>)[] = ['commentId', 'sweetId', 'resweetId'];
		const count = keys.reduce((acc, key) => {
			return acc + (sweetLike[key] ? 1 : 0);
		}, 0);
		if (count > 1) {
			throw new Error('Only one of parentCommentId, sweetId, or resweetId should be provided.');
		}

		return await SweetLikesDAO.insertSweetLike(sweetLike);
	}
}
