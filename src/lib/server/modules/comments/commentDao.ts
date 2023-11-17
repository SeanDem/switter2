import { supabase } from '$lib/supabaseClient';
import type { SweetComment } from '.';
import type { Interaction, InteractionIdRequest } from '../interactions';

export class CommentDAO {
	static async createComment(comment: SweetComment): Promise<SweetComment> {
		const sweetCommentTable = this.mapCommentToSnakeCase(comment);
		const { data, error } = await supabase.from('comment').insert([sweetCommentTable]);

		if (error) throw new Error(error.message);
		return data!;
	}

	static async getCommentById(comment_id: string): Promise<SweetComment | null> {
		const { data, error } = await supabase
			.from('comment')
			.select('*')
			.eq('comment_id', comment_id)
			.single();

		if (error) throw new Error(error.message);
		return data;
	}

	static async getAllComments(): Promise<SweetComment[]> {
		const { data, error } = await supabase.from('comment').select('*');

		if (error) throw new Error(error.message + error.details + error.hint);
		return data!;
	}

	static async getCommentsByInteractionId(
		uid: string,
		{
			sweetId: _sweet_id = null,
			commentId: _comment_id = null,
			resweetId: _resweet_id = null
		}: InteractionIdRequest
	): Promise<Interaction[]> {
		const { data, error } = await supabase.rpc('getcommentsbyid', {
			_sweet_id,
			_comment_id,
			_resweet_id
		});
		if (error) throw new Error(error.message);
		return data!;
	}
	static mapCommentToSnakeCase(comment: SweetComment): SweetCommentTable {
		return {
			uid: comment.uid,
			text: comment.text,
			parent_comment_id: comment.parentCommentId,
			sweet_id: comment.sweetId,
			resweet_id: comment.resweetId
		};
	}
}

type SweetCommentTable = {
	text: string;
	uid: string;
	comment_id?: string | null;
	parent_comment_id?: string | null;
	sweet_id?: string | null;
	resweet_id?: string | null;
	timestamp?: Date;
};
