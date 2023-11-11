import { supabase } from '$lib/supabaseClient';
import type { UserProfile } from './userProfileType';

class UserProfileDAO {
	static async createUserProfile(userProfile: Omit<UserProfile, 'uid'>): Promise<UserProfile> {
		const { data, error } = await supabase.from('UserProfile').insert([userProfile]);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async getUserProfileById(uid: string): Promise<UserProfile | null> {
		const { data, error } = await supabase.from('UserProfile').select('*').eq('uid', uid).single();

		if (error) throw new Error(error.message);
		return data;
	}

	static async updateUserProfile(
		uid: string,
		userProfileUpdates: Partial<UserProfile>
	): Promise<UserProfile> {
		const { data, error } = await supabase
			.from('UserProfile')
			.update(userProfileUpdates)
			.eq('uid', uid);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async deleteUserProfile(uid: string): Promise<boolean> {
		const { error } = await supabase.from('UserProfile').delete().eq('uid', uid);

		if (error) throw new Error(error.message);
		return true;
	}

	static async getAllUserProfiles(): Promise<UserProfile[]> {
		const { data, error } = await supabase.from('UserProfile').select('*');

		if (error) throw new Error(error.message);
		return data!;
	}
}
