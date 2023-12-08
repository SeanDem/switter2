import { badWordFilter } from '$lib/server/utils/badWords';
import { executeWithApiResponse } from '$lib/server/utils/utils';
import { HttpStatus, type APIResponse } from '../types/types';
import { CommentDAO } from './commentDao';
import type { SweetComment } from './commentType';

export class CommentService {
	static async createComment(
		comment: Omit<SweetComment, 'commentId'>
	): Promise<APIResponse<SweetComment | null>> {
		const keys: (keyof Omit<SweetComment, 'commentId'>)[] = [
			'parentCommentId',
			'sweetId',
			'resweetId'
		];

		const count = keys.reduce((acc, key) => {
			return acc + (comment[key] ? 1 : 0);
		}, 0);

		if (count > 1) {
			return {
				data: null,
				status: HttpStatus.BadRequest,
				message: 'Cannot have more than one parent'
			};
		}
		comment.text = badWordFilter.clean(comment.text?.trim() ?? '');
		return executeWithApiResponse(async () => {
			return CommentDAO.createComment(comment);
		});
	}
}
