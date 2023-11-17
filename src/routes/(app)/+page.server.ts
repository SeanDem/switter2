import { CommentService, type SweetComment } from '$lib/server/modules/comments';
import {
	InteractionService,
	type Interaction,
	type InteractionIdRequest
} from '$lib/server/modules/interactions';
import { LikeService, type SweetLike } from '$lib/server/modules/likes';
import { ResweetService, type Resweet } from '$lib/server/modules/resweets';
import { fail, type Actions, redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw redirect(301, '/auth');
	const sweetDetailList: Interaction[] = await InteractionService.getInteractionListByType(
		uid,
		'sweet'
	);
	return { sweetDetailList };
};

export const actions: Actions = {
	like: async ({ request, cookies }) => {
		const uid = cookies.get('uid');
		if (!uid) throw redirect(301, '/auth');

		const form = await request.formData();
		const interactionReq = form.get('interaction');
		if (!interactionReq) {
			return fail(400, { missing: true });
		}
		const interaction: InteractionIdRequest = JSON.parse(interactionReq?.toString());
		LikeService.createSweetLike(uid, interaction);
	},
	unlike: async ({ request, cookies }) => {
		const uid = cookies.get('uid');
		if (!uid) throw redirect(301, '/auth');

		const form = await request.formData();
		const interactionReq = form.get('interaction');
		if (!interactionReq) {
			return fail(400, { missing: true });
		}
		const interaction: InteractionIdRequest = JSON.parse(interactionReq?.toString());
		LikeService.deleteSweetLike(uid, interaction);
	},
	comment: async ({ request, cookies }) => {
		const uid = cookies.get('uid');
		if (!uid) throw redirect(301, '/auth');

		const form = await request.formData();

		const parentType = form.get('parentType');
		const text = form.get('text');
		const id = form.get('id');
		if (!parentType || !text || !id) {
			return fail(400, { missing: true });
		}

		if (typeof text !== 'string' || typeof id !== 'string') {
			return fail(400, { invalid: true });
		}

		const sweetComment: SweetComment = {
			uid,
			text,
			parentCommentId: null,
			sweetId: null,
			resweetId: null
		};

		switch (parentType) {
			case 'sweet':
				sweetComment.sweetId = id;
				break;
			case 'comment':
				sweetComment.parentCommentId = id;
				break;
			case 'resweet':
				sweetComment.resweetId = id;
				break;
			default:
				fail(400, { invalid: true });
		}
		CommentService.createComment(sweetComment);
	},
	resweet: async ({ request, cookies }) => {
		const uid = cookies.get('uid');
		if (!uid) throw redirect(301, '/auth');

		const form = await request.formData();
		const id = form.get('id');
		const parentType = form.get('parentType');
		let text = form.get('text');

		if (!id || !parentType) {
			return fail(400, { missing: true });
		}

		if (typeof id !== 'string') {
			return fail(400, { invalid: true });
		}

		if (typeof text !== 'string') {
			text = null;
		}

		const resweet: Resweet = {
			uid,
			text: text,
			sweetId: id,
			parentResweetId: null,
			commentId: null
		};

		switch (parentType) {
			case 'sweet':
				resweet.sweetId = id;
				break;
			case 'comment':
				resweet.parentResweetId = id;
				break;
			case 'resweet':
				resweet.resweetId = id;
				break;
			default:
				fail(400, { invalid: true });
		}

		ResweetService.createResweet(resweet);
	}
};
