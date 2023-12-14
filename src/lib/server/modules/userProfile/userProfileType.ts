export type UserProfile = {
	uid: string;
	handle: string;
	email: string;
	name?: string;
	bio?: string | null;
	phone?: string | null;
	birthday?: string | null;
	profileUrl?: string | null;
	isFollowing?: boolean;
	followerCount?: number;
	followingCount?: number;
};

export type UserProfilePartial = Pick<
	UserProfile,
	| 'uid'
	| 'handle'
	| 'bio'
	| 'name'
	| 'profileUrl'
	| 'isFollowing'
	| 'followerCount'
	| 'followingCount'
>;

export type userProfileBasic = Pick<UserProfile, 'uid' | 'handle' | 'name' | 'profileUrl'>;
