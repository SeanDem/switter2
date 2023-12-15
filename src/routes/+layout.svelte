<script>
	import './styles.css';
	import { browser } from '$app/environment';
	import { webVitals } from '$lib/utils/vitals.js';
	import { page } from '$app/stores';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { supabaseClient } from '$lib/utils/supabaseClient';
	import { onMount } from 'svelte';
	import { userProfileStore } from '$lib/store/userPorfileStore';
	export let data;

	$: if (browser && data?.analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId: data.analyticsId
		});
	}

	inject({ mode: dev ? 'development' : 'production' });
	injectSpeedInsights();

	onMount(() => {
		supabaseClient.auth.onAuthStateChange((event, session) => {
			console.info('AuthStateChange: ', event);
			if (session && session.user && session.user.aud === 'authenticated') {
				document.cookie = `uid=${session.user.id}; path=/;`;
				userProfileStore.set({ uid: session.user.id });
			} else {
				document.cookie = 'uid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
			}
		});
	});
</script>

<slot />
