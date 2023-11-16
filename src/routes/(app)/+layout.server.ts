import { env } from '$env/dynamic/private';

export const load = async () => {
	return { analyticsId: env.VERCEL_ANALYTICS_ID };
};
