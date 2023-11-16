<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { webVitals } from '$lib/vitals';
	import { onMount } from 'svelte';
	export let data;
	let isAuth = data.isAuth;

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
				isAuth = true;
				document.cookie = `uid=${session.user.id}; path=/;`;
			} else {
				isAuth = false;
				document.cookie = 'uid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
			}
		});
	});
</script>

<div class="app">
	<main>
		{#if isAuth}
			<Header />
			<slot />
			<footer />
		{:else}
			<slot />
		{/if}
	</main>
</div>
