import type { Interaction } from '../interactions';
import { CommentDAO } from './commentDao';
import type { SweetComment as SweetComment } from './commentType';

export class CommentService {
	static async getcommentsByInteractionId(sweetId: string): Promise<Interaction[]> {
		return CommentDAO.getCommentsByInteractionId({ sweetId: sweetId });
	}

	static async createComment(comment: Omit<SweetComment, 'commentId'>): Promise<SweetComment> {
		const keys: (keyof Omit<SweetComment, 'commentId'>)[] = [
			'parentCommentId',
			'sweetId',
			'resweetId'
		];

		const count = keys.reduce((acc, key) => {
			return acc + (comment[key] ? 1 : 0);
		}, 0);

		if (count > 1) {
			throw new Error('Only one of parentCommentId, sweetId, or resweetId should be provided.');
		}

		return CommentDAO.createComment(comment);
	}
}
