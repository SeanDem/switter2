import { badWordFilter } from '$lib/server/ServerUtils/badWords';
import type { Interaction, InteractionIdRequest } from '../interactions';
import { CommentDAO } from './commentDao';
import type { SweetComment as SweetComment } from './commentType';

export class CommentService {
	static async createComment(comment: Omit<SweetComment, 'commentId'>): Promise<SweetComment> {
		if (!comment.text) {
			throw new Error('Comment text is required.');
		}
		comment.text = badWordFilter.clean(comment.text?.trim());
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
