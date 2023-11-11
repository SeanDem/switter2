import { SweetService, type Sweet } from "$lib/server/modules/sweets";

export const load = async () => {
	const sweetList: Sweet[] = await SweetService.getAllSweets();
	return { sweetList };
};
