<script>
	import './styles.css';
	import { browser } from '$app/environment';
	import { webVitals } from '$lib/utils/vitals.js';
	import { page } from '$app/stores';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	export let data;

	inject({ mode: dev ? 'development' : 'production' });

	injectSpeedInsights();

	$: if (browser && data?.analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId: data.analyticsId
		});
	}
</script>

<slot />

<style global>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';
</style>
