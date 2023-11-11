import { SweetService } from '$lib/server/modules/sweets';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		try {
			const form = await request.formData();
			const uid = cookies.get('uid');

			if (!uid) {
				return { status: 401, errors: { message: 'Unauthorized' } };
			}
			const text = form.get('text');
			if (!text || typeof text !== 'string') {
				return { status: 400, errors: { message: 'Invalid text input.' } };
			}

			await SweetService.createSweet(uid, text);
			return { status: 303, headers: { Location: '/' } };
		} catch (error) {
			console.error(error);
			return { status: 500, errors: { message: 'There was an error creating the Sweet.' } };
		}
	}
};
