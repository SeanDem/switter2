import type { Interaction } from '$lib/server/modules/interactions';
import { SweetService, type Sweet } from '$lib/server/modules/sweets';
import { fail, type Actions, redirect } from '@sveltejs/kit';

export const load = async () => {
	const sweetDetailList: Interaction[] = await SweetService.getAllSweetDetails();
	return { sweetDetailList };
};

export const actions: Actions = {
	like: async ({ request, cookies }) => {
		const form = await request.formData();
		console.log('like');
		console.log(form);

		const uid = cookies.get('uid');
		if (!uid) {
			return fail(401, { uid, missing: true });
		}
	},
	comment: async ({ request, cookies }) => {
		const form = await request.formData();
		console.log('comment');
		console.log(form);
		const uid = cookies.get('uid');
		if (!uid) {
			return fail(401, { uid, missing: true });
		}
	},
	resweet: async ({ request, cookies }) => {
		const form = await request.formData();
		console.log('resweet');
		console.log(form);
		const uid = cookies.get('uid');
		if (!uid) {
			return fail(401, { uid, missing: true });
		}
	},
	test: async ({ request, cookies }) => {
		const form = await request.formData();
		console.log(form);
		console.log('test');
	}
};
