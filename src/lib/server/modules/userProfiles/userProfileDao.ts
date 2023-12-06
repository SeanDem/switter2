import { supabase } from '$lib/supabaseClient';
import type { UserProfile, UserProfilePartial } from './userProfileType';

export class UserProfileDAO {
	static async createUserProfile(userProfile: Omit<UserProfile, 'uid'>): Promise<UserProfile> {
		const { data, error } = await supabase.from('userprofile').insert([userProfile]).single();

		if (error) throw new Error(error.details + error.message + error.hint);
		return data;
	}

	static async getUserProfileById(uid: string): Promise<UserProfile | null> {
		const { data, error } = await supabase
			.from('userprofile')
			.select('uid, handle, bio, name, profileUrl:profile_url, birthday, phone, email')
			.eq('uid', uid)
			.single();

		if (error) throw new Error(error.details + error.message + error.hint);
		return data;
	}

	static async getUserProfilePartialById(uid: string): Promise<UserProfilePartial | null> {
		const { data, error } = await supabase
			.from('userprofile')
			.select('uid, handle, bio, name, profileUrl:profile_url')
			.eq('uid', uid)
			.single();

		if (error) throw new Error(error.details + error.message + error.hint);
		return data;
	}

	static async updateUserProfile(
		uid: string,
		userProfileUpdates: Partial<UserProfile>
	): Promise<boolean> {
		const { data, error } = await supabase
			.from('userprofile')
			.update(userProfileUpdates)
			.eq('uid', uid)
			.single();

		if (error) throw new Error(error.details + error.message + error.hint);
		return true;
	}

	static async deleteUserProfile(uid: string): Promise<boolean> {
		const { error } = await supabase.from('userprofile').delete().eq('uid', uid);

		if (error) throw new Error(error.message);
		return true;
	}

	static async getAllUserProfiles(): Promise<UserProfile[]> {
		const { data, error } = await supabase.from('userprofile').select('*');

		if (error) throw new Error(error.message);
		return data!;
	}

	static async emailExists(email: string): Promise<boolean> {
		const { data, error } = await supabase
			.from('userprofile')
			.select('email')
			.eq('email', email)
			.single();

		if (error) throw new Error(error.message);
		return data !== null;
	}

	static async handleExists(handle: string): Promise<boolean> {
		const { data, error } = await supabase
			.from('userprofile')
			.select('handle')
			.eq('handle', handle)
			.single();

		if (error) throw new Error(error.message);
		return data !== null;
	}
}
