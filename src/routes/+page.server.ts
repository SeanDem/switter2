import SweetService from '$lib/server/db/sweet/sweetService';
import type { Sweet } from '$lib/server/db/sweet/type';

export const load = async () => {
	const sweetList: Sweet[] = await SweetService.getAllSweets();
	return { sweetList };
};
