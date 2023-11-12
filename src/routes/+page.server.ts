import { SweetService, type SweetDetail } from '$lib/server/modules/sweets';

export const load = async () => {
	const sweetDetailList: SweetDetail[] = await SweetService.getAllSweetDetails();
	return { sweetDetailList };
};
