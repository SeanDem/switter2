import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	if (cookies.get('uid')) throw redirect(301, '/');
};
