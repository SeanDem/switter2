import { goto } from '$app/navigation';
import { supabase } from '$lib/supabaseClient';

export const ssr = false;
export const load = async () => {
	const { data, error } = await supabase.auth.getUser();
	if (data.user?.aud === 'authenticated') {
		document.cookie = `uid=${data.user.id}; path=/;`;
		goto('/');
	}
};