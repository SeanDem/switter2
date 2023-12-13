import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, parent }) => {
	console.log(await parent());
	if (cookies.get('uid')) throw redirect(301, '/');
};
