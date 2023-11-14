import { SweetLikesDAO } from './likeDao';
import type { SweetLike } from './likeType';

export class LikeService {
	static async createLike(sweetLike: Omit<SweetLike, 'like_id' | 'timestamp'>): Promise<SweetLike> {
		return SweetLikesDAO.createSweetLike(sweetLike);
	}
}
