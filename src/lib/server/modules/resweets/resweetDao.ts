import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import type { Resweet } from '.';
import type { InteractionIdRequest } from '../interactions';

export class ResweetDAO {
	static async insertResweet(resweet: Omit<Resweet, 'resweetId'>): Promise<Resweet> {
		const resweetTable = this.mapResweetToSnakeCase(resweet);
		const { data, error } = await supabase.from('resweet').insert([resweetTable]);

		if (error) throw new Error(error.message);
		return data!;
	}

	static async deleteResweet(resweetId: string): Promise<boolean> {
		const { data, error } = await supabase
			.from('resweet')
			.delete()
			.match({ resweet_id: resweetId });

		if (error) throw new Error(error.message);
		return true;
	}
	static async getResweetByIdRequestAndUid(
		uid: string,
		interactionIdRequest: InteractionIdRequest
	): Promise<string | null> {
		let conditions = [];
		if (interactionIdRequest.commentId)
			conditions.push(`comment_id.eq.${interactionIdRequest.commentId}`);
		if (interactionIdRequest.sweetId)
			conditions.push(`sweet_id.eq.${interactionIdRequest.sweetId}`);
		if (interactionIdRequest.resweetId)
			conditions.push(`resweet_id.eq.${interactionIdRequest.resweetId}`);

		if (conditions.length !== 1) {
			throw new Error('No valid ID provided in IdTypeDaoRequest object.');
		}

		const queryCondition = conditions.join(',');

		const { data, error } = await supabase
			.from('resweet')
			.select('*')
			.eq('uid', uid)
			.or(queryCondition);
		if (error) throw new Error(error?.details + error?.message + error?.hint);
		if (data && data.length > 0) return data[0].resweet_id;
		return data[0];
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
