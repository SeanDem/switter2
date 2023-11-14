import type { InteractionDetails } from '../interactions';

export type Comment = {
	comment_id: string;
	parent_comment_id: string | null;
	sweet_id: string;
	uid: string;
	timestamp: Date;
	text: string;
};

export type CommentDetail = Comment & InteractionDetails;
