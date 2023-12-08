import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	throw redirect(301, `/profile/${cookies.get('uid')}`);
};
