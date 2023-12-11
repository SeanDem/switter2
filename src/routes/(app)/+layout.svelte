<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import { supabaseClient } from '$lib/utils/supabaseClient.js';
	import { webVitals } from '$lib/utils/vitals.js';
	import { onDestroy, onMount } from 'svelte';
	export let data;
	let lastScrollY = 0;
	let showNavbar = true;

	$: if (browser && data?.analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId: data.analyticsId
		});
	}

	onMount(() => {
		supabaseClient.auth.onAuthStateChange((event, session) => {
			console.info('AuthStateChange: ', event);
			if (session && session.user && session.user.aud === 'authenticated') {
				document.cookie = `uid=${session.user.id}; path=/;`;
			} else {
				document.cookie = 'uid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
			}
		});
	});

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		showNavbar = currentScrollY < lastScrollY || currentScrollY < 50;
		lastScrollY = currentScrollY;
	};

	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', handleScroll);
		}
	});
	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<main class="pt-12">
	<Header {showNavbar} />
	<div class="my-10">
		<slot />
	</div>
	<footer />
</main>
