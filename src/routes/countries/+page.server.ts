import { supabase } from '$lib/supabaseClient';

export const load = async () => {
	return {
		countries: supabase.from('countries').select() ?? []
	};
};
