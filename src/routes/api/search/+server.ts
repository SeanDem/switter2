import { SearchService } from '$lib/server/modules/search';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const uid = cookies.get('uid');
	if (!uid) {
		return json({ message: 'Not logged in.', status: 401 });
	}

	const { searchText, interactionType } = await request.json();

	if (interactionType === 'profile') {
		const profileList = await SearchService.combinedSearchUserProfiles(searchText, searchText);
		return json({ profileList });
	} else {
		const interactionListRes = await SearchService.searchInteractionText(uid, {
			searchText,
			interactionType
		});

		const interactionList = interactionListRes.data;
		return json({ interactionList });
	}
}
