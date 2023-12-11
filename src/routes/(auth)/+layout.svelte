<script lang="ts">
	import { supabaseClient } from '$lib/utils/supabaseClient.js';
	import { onMount } from 'svelte';
	export let form;

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
</script>

<slot />
{#if form?.message}
	<div>{form?.message}</div>
{/if}
