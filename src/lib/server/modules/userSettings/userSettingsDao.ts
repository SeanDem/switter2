import { supabase } from '$lib/supabaseClient';
import type { UserSettings } from './userSettingsType';

export class UserSettingsDAO {
	static async createUserSettings(
		userSettings: Omit<UserSettings, 'settings_id'>
	): Promise<UserSettings> {
		const { data, error } = await supabase.from('UserSettings').insert([userSettings]);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async getUserSettingsById(settings_id: string): Promise<UserSettings | null> {
		const { data, error } = await supabase
			.from('UserSettings')
			.select('*')
			.eq('settings_id', settings_id)
			.single();

		if (error) throw new Error(error.message);
		return data;
	}

	static async updateUserSettings(
		settings_id: string,
		userSettingsUpdates: Partial<UserSettings>
	): Promise<UserSettings> {
		const { data, error } = await supabase
			.from('UserSettings')
			.update(userSettingsUpdates)
			.eq('settings_id', settings_id);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async deleteUserSettings(settings_id: string): Promise<boolean> {
		const { error } = await supabase.from('UserSettings').delete().eq('settings_id', settings_id);

		if (error) throw new Error(error.message);
		return true;
	}

	static async getAllUserSettings(): Promise<UserSettings[]> {
		const { data, error } = await supabase.from('UserSettings').select('*');

		if (error) throw new Error(error.message);
		return data!;
	}
}
