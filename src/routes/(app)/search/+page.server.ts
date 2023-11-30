import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
import { SearchService } from '$lib/server/modules/search';
import { fail, type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	search: async ({ cookies, request }) => {
		const uid = cookies.get('uid');
		if (!uid) {
			throw redirect(301, '/auth');
		}
		const form = await request.formData();

		const searchText = form.get('search');
		if (!searchText || typeof searchText !== 'string') {
			return fail(401, { searchText, missing: true });
		}

		const interactionType = form.get('interactionType') as InteractionType;
		if (!interactionType) {
			console.log('interactionType', interactionType);
			return fail(401, { interactionType, missing: true });
		}

		const interactionList: Interaction[] = await SearchService.searchInteractionText(uid, {
			searchText,
			interactionType
		});

		return { interactionList };
	}
};
