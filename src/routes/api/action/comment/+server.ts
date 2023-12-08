import { CommentService } from '$lib/server/modules/comments/commentService.js';
import type { SweetComment } from '$lib/server/modules/comments/commentType.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const uid = cookies.get('uid');
	if (!uid) {
		return json({ message: 'Not logged in.', status: 401 });
	}
	const comment: SweetComment = await request.json();
	comment.uid = uid;
	const res = await CommentService.createComment(comment);
	return json({ res });
}
