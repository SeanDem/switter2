<script lang="ts">
	import { dev } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { onMount } from 'svelte';
	import './styles.css';
	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	inject({ mode: dev ? 'development' : 'production' });

	injectSpeedInsights();

	// $: if (browser && data?.analyticsId) {
	// 	webVitals({
	// 		path: $page.url.pathname,
	// 		params: $page.params,
	// 		analyticsId: data.analyticsId
	// 	});
	// }

	onMount(() => {
		console.log('session: ' + session);
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			console.log('-----Auth state change detected-----');
			invalidateAll();
		});
		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<slot />

<style global>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';
</style>
