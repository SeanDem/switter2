import SweetService from '$lib/server/sweets/sweetService';
import type { Sweet } from '$lib/server/sweets/sweetType';

export const load = async () => {
	const sweetList: Sweet[] = await SweetService.getAllSweets();
	return { sweetList };
};
