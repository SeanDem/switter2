import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	throw redirect(301, `/profile/${params.uid}/sweets`);
};
