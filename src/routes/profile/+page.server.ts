import { InteractionService } from '$lib/server/modules/interactions/interactionService.js';
import { SweetService } from '$lib/server/modules/sweets/sweetService.js';
import type { Sweet } from '$lib/server/modules/sweets/sweetType.js';
import { error } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw error(401, 'Unauthorized');

	const sweetDetailsList = await InteractionService.getInteractionListByTypeAndUid('sweet', uid);
	return { sweetDetailsList };
};
