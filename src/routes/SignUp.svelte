<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import type { AuthError } from '@supabase/supabase-js';

	let email = '';
	let password = '';
	let errorRes: AuthError | null = null;

	async function signIn() {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			errorRes = error;
			console.error('Error signing in:', error);
		} else console.log('Success! User signed in', data.user);
	}
</script>

<form on:submit|preventDefault={signIn}>
	<input type="email" bind:value={email} placeholder="Email" />
	<input type="password" bind:value={password} placeholder="Password" />
	<button type="submit">Sign In</button>
</form>
{#if errorRes}
	<div>Error signing in: {errorRes.message}</div>
{/if}
