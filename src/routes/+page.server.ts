import type { Interaction } from '$lib/server/modules/interactions';
import { SweetService } from '$lib/server/modules/sweets';

export const load = async () => {
	const sweetDetailList: Interaction[] = await SweetService.getAllSweetDetails();
	return { sweetDetailList };
};
