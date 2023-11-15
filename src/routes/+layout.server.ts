import { env } from '$env/dynamic/private';

export const load = async ({ cookies }) => {
	return { analyticsId: env.VERCEL_ANALYTICS_ID, isAuth: !!cookies.get('uid') };
};
