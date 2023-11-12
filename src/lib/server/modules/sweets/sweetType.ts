import type { UserProfile } from '../userProfiles';

export type Sweet = {
	sweet_id: string;
	uid: string;
	text: string;
	media_urls: string[];
	comments?: SweetDetail[];
	timestamp?: string | null;
	ref_Sweet_Id?: string | null;
	type?: string | null;
};

export type SweetActionCount = {
	commentsCount: number;
	likesCount: number;
	resweetsCount: number;
};
export type SweetDetail = Sweet &
	SweetActionCount &
	Pick<UserProfile, 'handle' | 'bio' | 'name' | 'profile_url'> & {
		comments: SweetDetail[];
	};
