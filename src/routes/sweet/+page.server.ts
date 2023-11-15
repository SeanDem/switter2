import { SweetService } from '$lib/server/modules/sweets';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	create: async ({ request, cookies }) => {
		const form = await request.formData();

		const uid = cookies.get('uid');
		if (!uid) throw redirect(301, '/auth');

		const text = form.get('text');
		if (!text || typeof text !== 'string') {
			return fail(401, { text, incorrect: true });
		}

		await SweetService.createSweet(uid, text);
		throw redirect(303, '/');
	}
};
