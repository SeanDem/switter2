import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
import { SearchService } from '$lib/server/modules/search';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	search: async ({ request }) => {
		const form = await request.formData();

		const searchText = form.get('search');
		if (!searchText || typeof searchText !== 'string') {
			return fail(401, { searchText, missing: true });
		}

		const interactionType = form.get('interactionType') as InteractionType;
		if (!interactionType) {
			return fail(401, { interactionType, missing: true });
		}

		const sweetList: Interaction[] = await SearchService.searchInteractionText({
			searchText,
			interactionType
		});

		return { sweetList };
	}
};
