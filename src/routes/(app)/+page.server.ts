import { CommentService, type SweetComment } from '$lib/server/modules/comments';
import {
	InteractionService,
	type Interaction,
	type InteractionIdRequest
} from '$lib/server/modules/interactions';
import { LikeService } from '$lib/server/modules/likes';
import { ResweetService, type Resweet } from '$lib/server/modules/resweets';
import type { APIResponse } from '$lib/server/modules/types/types';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw redirect(301, '/auth');
	const res = await InteractionService.getInteractionListByType(
		uid,
		'sweet'
	);
	const sweetDetailList = res.data;
	return { sweetDetailList };
};

export const actions: Actions = {
	like: async ({ request, cookies }) => {
		const uid = cookies.get('uid');
		if (!uid) throw error(401, 'Unauthorized');

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
		if (!uid) throw error(401, 'Unauthorized');

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

		const interactionReq = form.get('interaction');
		if (!interactionReq) {
			return fail(400, { missing: true });
		}
		const interaction: InteractionIdRequest = JSON.parse(interactionReq?.toString());

		const { sweetId, commentId, resweetId } = interaction;

		const text = form.get('text');
		if (typeof text !== 'string') {
			return fail(400, { invalid: true });
		}

		const sweetComment: SweetComment = {
			uid,
			text,
			parentCommentId: commentId || null,
			sweetId: sweetId || null,
			resweetId: resweetId || null
		};

		if (!sweetComment.parentCommentId && !sweetComment.sweetId && !sweetComment.resweetId) {
			return fail(400, { invalid: true });
		}

		CommentService.createComment(sweetComment);
	},
	resweet: async ({ request, cookies }) => {
		const uid = cookies.get('uid');
		if (!uid) throw redirect(301, '/auth');

		const form = await request.formData();
		const interactionReq = form.get('interaction');

		if (!interactionReq) {
			return fail(400, { missing: true });
		}
		const interaction: InteractionIdRequest = JSON.parse(interactionReq?.toString());

		const { sweetId, commentId, resweetId } = interaction;

		let text = form.get('text');
		if (typeof text !== 'string') {
			text = null;
		}

		const resweet: Resweet = {
			uid,
			text: text,
			sweetId: sweetId || null,
			parentResweetId: resweetId || null,
			commentId: commentId || null
		};

		ResweetService.createResweet(resweet);
	},
	unresweet: async ({ request, cookies }) => {
		const uid = cookies.get('uid');
		if (!uid) throw redirect(301, '/auth');

		const form = await request.formData();

		const interactionReq = form.get('interaction');

		if (!interactionReq) {
			return fail(400, { missing: true });
		}
		const interaction: InteractionIdRequest = JSON.parse(interactionReq?.toString());

		ResweetService.deleteResweet(uid, interaction);
	}
};
