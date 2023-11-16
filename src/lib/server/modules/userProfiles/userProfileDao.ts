import { supabase } from '$lib/supabaseClient';
import type { UserProfile, UserProfilePartial } from './userProfileType';

export class UserProfileDAO {
	static async createUserProfile(userProfile: Omit<UserProfile, 'uid'>): Promise<UserProfile> {
		const { data, error } = await supabase.from('userprofile').insert([userProfile]).single();

		if (error) throw new Error(error.details + error.message + error.hint);
		return data;
	}

	static async getUserProfileById(uid: string): Promise<UserProfilePartial | null> {
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
	): Promise<UserProfile> {
		const { data, error } = await supabase
			.from('userprofile')
			.update(userProfileUpdates)
			.eq('uid', uid)
			.single();

		if (error) throw new Error(error.details + error.message + error.hint);
		return data;
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
}
