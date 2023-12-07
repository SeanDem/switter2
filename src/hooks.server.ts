// I know there are type errors on this file but it's fine.
// It's copied directly from official sveltekit docs and works fine.

import { createServerClient } from '@supabase/ssr';
import type { Handle } from '@sveltejs/kit';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY ?? '';

export const handle: Handle = async ({ event, resolve }) => {
	// @ts-ignore
	event.locals.supabase = createServerClient(supabaseUrl, supabaseKey, {
		cookies: {
			get: (key) => event.cookies.get(key),
			set: (key, value, options) => {
				event.cookies.set(key, value, options);
			},
			remove: (key, options) => {
				event.cookies.delete(key, options);
			}
		}
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	// @ts-ignore
	event.locals.getSession = async () => {
		const {
			data: { session }
			// @ts-ignore
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};
