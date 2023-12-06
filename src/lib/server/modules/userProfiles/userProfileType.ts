export type UserProfile = {
	uid: string;
	handle: string;
	email: string;
	name?: string;
	bio?: string | null;
	phone?: string | null;
	birthday?: string | null;
	profileUrl?: string | null;
	isFollowing?: boolean | null;
};

export type UserProfilePartial = Pick<
	UserProfile,
	'uid' | 'handle' | 'bio' | 'name' | 'profileUrl' | 'isFollowing'
>;
