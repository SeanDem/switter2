import { env } from '$env/dynamic/private';
import { userStore } from '$lib/store/store';
import { supabase } from '$lib/supabaseClient';

export const load = async () => {
	const res = await supabase.auth.getUser();
	if (res.data.user) userStore.set(res.data.user);

	return { analyticsId: env.VERCEL_ANALYTICS_ID, user: res.data.user };
};
