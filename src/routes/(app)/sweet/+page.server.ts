import { SweetService } from '$lib/server/modules/sweets';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	create: async ({ request, cookies }) => {
		const form = await request.formData();

		const uid = cookies.get('uid');
		if (!uid) throw redirect(301, '/auth');

		const text = form.get('sweet');
		if (!text || typeof text !== 'string') {
			console.log('createSweet: no text');
			return fail(401, { text, incorrect: true });
		}

		await SweetService.createSweet(uid, text);
		throw redirect(303, '/');
	}
};
