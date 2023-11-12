import { supabase } from '$lib/supabaseClient';
import type { UserProfile } from './userProfileType';

export class UserProfileDAO {
	static async createUserProfile(userProfile: Omit<UserProfile, 'uid'>): Promise<UserProfile> {
		const { data, error } = await supabase.from('userprofile').insert([userProfile]).single();

		if (error) throw new Error(error.message);
		return data;
	}

	static async getUserProfileById(uid: string): Promise<UserProfile | null> {
		const { data, error } = await supabase.from('userprofile').select('*').eq('uid', uid).single();

		if (error) throw new Error(error.message);
		return data;
	}

	static async updateUserProfile(
		uid: string,
		userProfileUpdates: Partial<UserProfile>
	): Promise<UserProfile> {
		const { data, error } = await supabase
			.from('userProfile')
			.update(userProfileUpdates)
			.eq('uid', uid)
			.single();

		if (error) {
			console.error(error);
			throw new Error(error.message);
		}
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
