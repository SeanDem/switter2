import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	console.log(cookies.get('uid'));
	if (cookies.get('uid')) throw redirect(301, '/');
};
