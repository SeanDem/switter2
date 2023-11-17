import type { InteractionDetails } from '../interactions';

export type SweetLike = {
	uid: string;
	likeId?: string | null;
	timestamp?: Date | null;
	sweetId?: string | null;
	commentId?: string | null;
	parentCommentId?: string | null;
	resweetId?: string | null;
	parentResweetId?: string | null;
};

export type LikeDetail = SweetLike & InteractionDetails;
