<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import SignIn from './SignIn.svelte';
	import SignUp from './SignUp.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { webVitals } from '$lib/vitals';
	import type { User } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	import Header from './Header.svelte';
	import './styles.css';
	import { userStore } from '$lib/store/store';

	export let data;

	$: if (browser && data?.analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId: data.analyticsId
		});
	}
	onMount(() => {
		supabase.auth.onAuthStateChange((event, session) => {
			if (session && session.user) {
				userStore.set(session.user);
				document.cookie = `uid=${session.user.id}; path=/;`;
			} else {
				document.cookie = 'uid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
			}
		});
	});
</script>

<div class="app">
	<main>
		{#if $userStore}
			<Header />
			<slot />
			<footer>
				<div>footer</div>
			</footer>
		{:else}
			<SignIn />
			<SignUp />
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
