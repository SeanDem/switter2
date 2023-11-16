import { goto } from '$app/navigation';

export const load = async ({ cookies }) => {
	if (cookies.get('uid')) goto('/');
};
