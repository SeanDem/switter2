export type UserProfile = {
	uid: string;
	handle: string;
	email: string;
	name?: string;
	bio?: string | null;
	phone?: string | null;
	birthday?: Date | null;
	profile_url?: string | null;
};
