import type { Interaction } from '../interactions';
import { CommentDAO } from './commentDao';

export class CommentService {
	static async getcommentsBySweetId(sweetId: string): Promise<Interaction[]> {
		return CommentDAO.getCommentsBySweetId({ sweetId: sweetId });
	}
}
