import type { SweetComment } from '../comments';
import type { Resweet } from '../resweets';
import type { Sweet } from '../sweets';
import type { UserProfile } from '../userProfile';

export type Interaction = Sweet & SweetComment & Resweet & InteractionDetails;

export type InteractionDetails = SweetInteractionCount &
	Pick<UserProfile, 'handle' | 'bio' | 'name' | 'profileUrl'> & {
		type: InteractionType;
		actionId: string;
		isLiked: boolean;
		isCommented: boolean;
		isResweeted: boolean;
	};

export type InteractionBase = {};

export type SweetInteractionCount = {
	commentsCount: number;
	likesCount: number;
	resweetsCount: number;
};

export type InteractionIdRequest = {
	sweetId?: string | null;
	commentId?: string | null;
	resweetId?: string | null;
};
export type InteractionIdsListRequest = {
	sweetIds?: string[] | null;
	commentIds?: string[] | null;
	resweetIds?: string[] | null;
};

export type InteractionType = 'sweet' | 'comment' | 'resweet';
