import { supabase } from '$lib/supabaseClient';
import type { ReSweet } from './resweetsType';

export class ReSweetDAO {
	static async createReSweet(reSweet: Omit<ReSweet, 'resweet_id'>): Promise<ReSweet> {
		const { data, error } = await supabase.from('ReSweet').insert([reSweet]);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async getReSweetById(resweet_id: string): Promise<ReSweet | null> {
		const { data, error } = await supabase
			.from('ReSweet')
			.select('*')
			.eq('resweet_id', resweet_id)
			.single();

		if (error) throw new Error(error.message);
		return data;
	}

	static async updateReSweet(
		resweet_id: string,
		reSweetUpdates: Partial<ReSweet>
	): Promise<ReSweet> {
		const { data, error } = await supabase
			.from('ReSweet')
			.update(reSweetUpdates)
			.eq('resweet_id', resweet_id);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async deleteReSweet(resweet_id: string): Promise<boolean> {
		const { error } = await supabase.from('ReSweet').delete().eq('resweet_id', resweet_id);

		if (error) throw new Error(error.message);
		return true;
	}

	static async getAllReSweets(): Promise<ReSweet[]> {
		const { data, error } = await supabase.from('ReSweet').select('*');

		if (error) throw new Error(error.message);
		return data!;
	}
}
