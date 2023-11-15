import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const uid = cookies.get('uid');
	if (!uid) throw redirect(301, '/auth');
};
