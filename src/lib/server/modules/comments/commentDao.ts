import { supabase } from '$lib/supabaseClient';

export class CommentDAO {
	static async createComment(comment: Omit<Comment, 'comment_id'>): Promise<Comment> {
		const { data, error } = await supabase.from('comment').insert([comment]);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async getCommentById(comment_id: string): Promise<Comment | null> {
		const { data, error } = await supabase
			.from('comment')
			.select('*')
			.eq('comment_id', comment_id)
			.single();

		if (error) throw new Error(error.message);
		return data;
	}

	static async updateComment(
		comment_id: string,
		commentUpdates: Partial<Comment>
	): Promise<Comment> {
		const { data, error } = await supabase
			.from('comment')
			.update(commentUpdates)
			.eq('comment_id', comment_id);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async deleteComment(comment_id: string): Promise<boolean> {
		const { error } = await supabase.from('comment').delete().eq('comment_id', comment_id);

		if (error) throw new Error(error.message);
		return true;
	}

	static async getAllComments(): Promise<Comment[]> {
		const { data, error } = await supabase.from('comment').select('*');

		if (error) throw new Error(error.message);
		return data!;
	}
}
