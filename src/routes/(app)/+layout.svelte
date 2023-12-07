<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { webVitals } from '$lib/vitals';
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
		supabase.auth.onAuthStateChange((event, session) => {
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
		console.log(showNavbar);
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

<main class="pt-16">
	<Header {showNavbar} />
	<slot />
	<footer />
</main>
