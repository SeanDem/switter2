import { createServerClient } from '@supabase/ssr';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import type { Session, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY ?? '';

export const handle: Handle = async ({ event, resolve }) => {
	const locals = event.locals as ExtendedLocals;
	locals.getSession = () => getSession(locals);
	locals.supabase = createServerClient(supabaseUrl, supabaseKey, {
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

	if (event.url.pathname.startsWith('/auth')) {
		return await resolve(event);
	}

	if (event.url.pathname.startsWith('/api')) {
		return await resolve(event);
		const apiKey = event.request.headers.get('apikey');
		if (apiKey !== 'temp-api-key') {
			return new Response('Invalid API Key', { status: 401 });
		}
	}

	const session = await locals.getSession();
	// if (!session) return new Response('Unauthorized', { status: 401 });

	return resolve(event);
};

async function getSession(locals: ExtendedLocals): Promise<Session | null> {
	try {
		const {
			data: { session }
		} = await locals.supabase.auth.getSession();
		return session;
	} catch (error) {
		console.error('Error getting session:', error);
		return null;
	}
}

interface ExtendedLocals extends RequestEvent {
	supabase: SupabaseClient;
	getSession: () => Promise<Session | null>;
}
