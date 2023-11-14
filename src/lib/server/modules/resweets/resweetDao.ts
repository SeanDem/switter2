import { supabase } from '$lib/supabaseClient';
import type { Resweet } from '.';

export class ResweetDAO {
	static async insertResweet(resweet: Omit<Resweet, 'resweet_id'>): Promise<Resweet> {
		const resweetTable = this.mapResweetToSnakeCase(resweet);
		const { data, error } = await supabase.from('resweet').insert([resweetTable]);

		if (error) throw new Error(error.message);
		return data!;
	}

	static async getReSweetById(resweet_id: string): Promise<Resweet | null> {
		const { data, error } = await supabase
			.from('resweet')
			.select('*')
			.eq('resweet_id', resweet_id)
			.single();

		if (error) throw new Error(error.message);
		return data;
	}

	static async updateReSweet(
		resweet_id: string,
		reSweetUpdates: Partial<Resweet>
	): Promise<Resweet> {
		const { data, error } = await supabase
			.from('resweet')
			.update(reSweetUpdates)
			.eq('resweet_id', resweet_id);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async deleteReSweet(resweet_id: string): Promise<boolean> {
		const { error } = await supabase.from('resweet').delete().eq('resweet_id', resweet_id);

		if (error) throw new Error(error.message);
		return true;
	}

	static async getAllReSweets(): Promise<Resweet[]> {
		const { data, error } = await supabase.from('resweet').select('*');

		if (error) throw new Error(error.message);
		return data!;
	}
	static mapResweetToSnakeCase(resweet: Resweet): ResweetTable {
		return {
			uid: resweet.uid,
			text: resweet.text,
			parent_resweet_id: resweet.parentResweetId,
			sweet_id: resweet.sweetId,
			comment_id: resweet.resweetId
		};
	}
}

type ResweetTable = {
	uid: string;
	timestamp?: Date;
	text?: string | null;
	resweet_id?: string;
	parent_resweet_id?: string | null;
	sweet_id?: string | null;
	comment_id?: string | null;
};
