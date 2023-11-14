import { SweetService } from '$lib/server/modules/sweets/sweetService.js';
import type { Sweet } from '$lib/server/modules/sweets/sweetType.js';
import { error } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw new Error(error.message);
	401, 'Unauthorized';
	const sweetList: Sweet[] | null = await SweetService.getSweetsByUid(uid);
	return { sweetList };
};
