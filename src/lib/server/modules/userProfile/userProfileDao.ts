import { error } from '@sveltejs/kit';
import { supabaseService } from '$lib/server/utils/supabaseService';
import type { UserProfile, UserProfilePartial } from './userProfileType';

export class UserProfileDAO {
	profilePicturesBucket = 'profile-pictures';
	static async createUserProfile(userProfile: Omit<UserProfile, 'uid'>): Promise<UserProfile> {
		const { data, error } = await supabaseService
			.from('userprofile')
			.insert([userProfile])
			.single();

		if (error) throw new Error(error.details + error.message + error.hint);
		return data;
	}

	static async getUserProfileById(uid: string): Promise<UserProfile | null> {
		const { data, error } = await supabaseService
			.from('userprofile')
			.select('uid, handle, bio, name, profileUrl:profile_url, birthday, phone, email')
			.eq('uid', uid)
			.single();

		if (error) throw new Error(error.details + error.message + error.hint);
		return data;
	}

	static async getUserProfilePartialById(uid: string): Promise<UserProfilePartial | null> {
		const { data, error } = await supabaseService
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
		const { data, error } = await supabaseService
			.from('userprofile')
			.update(userProfileUpdates)
			.eq('uid', uid)
			.single();

		if (error) throw new Error(error.details + error.message + error.hint);
		return true;
	}

	static async updateUserProfileUrl(uid: string, newProfileUrl: string): Promise<boolean> {
		const { data, error } = await supabaseService
			.from('userprofile')
			.update({ profile_url: newProfileUrl })
			.eq('uid', uid)
			.single();

		if (error) throw new Error(error.details + error.message + error.hint);
		return true;
	}

	static async deleteUserProfile(uid: string): Promise<boolean> {
		const { error } = await supabaseService.from('userprofile').delete().eq('uid', uid);

		if (error) throw new Error(error.message);
		return true;
	}

	static async getAllUserProfiles(): Promise<UserProfile[]> {
		const { data, error } = await supabaseService.from('userprofile').select('*');

		if (error) throw new Error(error.message);
		return data!;
	}

	static async uploadProfilePicture(file: File) {
		const { data, error } = await supabaseService.storage
			.from('profile-pictures')
			.upload(file.name, file, {
				cacheControl: '3600',
				upsert: true
			});
		if (error) throw new Error(error.message);
		return supabaseService.storage.from('profile-pictures').getPublicUrl(file.name);
	}

	static async getPublicUrl(filePath: string): Promise<string> {
		const { data } = supabaseService.storage.from('profile-pictures').getPublicUrl(filePath);
		return data.publicUrl;
	}

	static async handleExists(handle: string, uid: string): Promise<boolean> {
		const { data, error } = await supabaseService
			.from('userprofile')
			.select('handle')
			.eq('handle', handle)
			.not('uid', 'eq', uid)
			.maybeSingle();

		if (error) throw new Error(error.message);
		return data !== null;
	}

	static async emailExists(email: string, uid: string): Promise<boolean> {
		const { data, error } = await supabaseService
			.from('userprofile')
			.select('email')
			.eq('email', email)
			.not('uid', 'eq', uid)
			.maybeSingle();

		if (error) throw new Error(error.message);
		return data !== null;
	}
}
