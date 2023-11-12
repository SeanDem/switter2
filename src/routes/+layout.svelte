<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { userStore } from '$lib/store/store';
	import { supabase } from '$lib/supabaseClient';
	import { webVitals } from '$lib/vitals';
	import { onMount } from 'svelte';
	import './styles.css';
	import SignUp from '$lib/components/SignUp.svelte';
	import SignIn from '$lib/components/SignIn.svelte';
	import Header from '$lib/components/Header.svelte';
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
			console.log('AuthStateChange: ', event);
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
		{#await $userStore}
			<div>Loading...</div>
		{:then userStore}
			{#if userStore}
				<Header />
				<slot />
				<footer />
			{:else}
				<SignIn />
				<SignUp />
			{/if}
		{/await}
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
