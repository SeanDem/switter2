export type UserProfile = {
	uid: string;
	handle: string;
	profile_url: string | null;
	phone: string | null;
	email: string;
	birthday: Date | null;
};
