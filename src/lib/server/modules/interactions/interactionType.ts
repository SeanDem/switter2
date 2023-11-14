import type { Comment } from '../comments';
import type { Resweet } from '../resweets';
import type { Sweet } from '../sweets';
import type { UserProfile } from '../userProfiles';

export type Interaction = Sweet & Comment & Resweet & InteractionDetails;

export type InteractionDetails = SweetInteractionCount &
	Pick<UserProfile, 'handle' | 'bio' | 'name' | 'profile_url'>;

export type SweetInteractionCount = {
	commentsCount: number;
	likesCount: number;
	resweetsCount: number;
};

export type InteractionIdRequest = {
	_sweet_id?: string | null;
	_comment_id?: string | null;
	_resweet_id?: string | null;
};

export type InteractionType = 'sweet' | 'comment' | 'resweet';

