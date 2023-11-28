import type { InteractionDetails } from '../interactions';

export type SweetComment = {
	uid: string;
	text: string;
	commentId?: string | null;
	parentCommentId?: string | null;
	sweetId?: string | null;
	resweetId?: string | null;
	timestamp?: string | null;
};

export type CommentDetail = SweetComment & InteractionDetails;
