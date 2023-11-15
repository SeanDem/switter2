<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { webVitals } from '$lib/vitals';
	import { onMount } from 'svelte';
	import './styles.css';
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

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
