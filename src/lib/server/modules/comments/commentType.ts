import type { InteractionDetails } from '../interactions';

export type Comment = {
	commentId: string;
	parentCommentId: string | null;
	sweetId: string;
	uid: string;
	timestamp: Date;
	text: string;
};

export type CommentDetail = Comment & InteractionDetails;
