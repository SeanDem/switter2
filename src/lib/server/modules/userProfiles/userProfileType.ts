export type UserProfile = {
	uid: string;
	handle: string;
	email: string;
	name?: string;
	bio?: string | null;
	phone?: string | null;
	birthday?: Date | null;
	profileUrl?: string | null;
};

export type UserProfilePartial = Pick<UserProfile, 'handle' | 'bio' | 'name' | 'profileUrl'>;
