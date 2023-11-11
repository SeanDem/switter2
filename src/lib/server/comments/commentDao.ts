import { supabase } from '$lib/supabaseClient';

class CommentDAO {
	static async createComment(comment: Omit<Comment, 'comment_id'>): Promise<Comment> {
		const { data, error } = await supabase.from('Comment').insert([comment]);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async getCommentById(comment_id: string): Promise<Comment | null> {
		const { data, error } = await supabase
			.from('Comment')
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
			.from('Comment')
			.update(commentUpdates)
			.eq('comment_id', comment_id);

		if (error) throw new Error(error.message);
		return data![0];
	}

	static async deleteComment(comment_id: string): Promise<boolean> {
		const { error } = await supabase.from('Comment').delete().eq('comment_id', comment_id);

		if (error) throw new Error(error.message);
		return true;
	}

	static async getAllComments(): Promise<Comment[]> {
		const { data, error } = await supabase.from('Comment').select('*');

		if (error) throw new Error(error.message);
		return data!;
	}
}
