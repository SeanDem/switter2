<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import type { AuthError } from '@supabase/supabase-js';

	let email = '';
	let password = '';
	let errorRes: AuthError | null = null;
	
	async function signUp() {
		const { data, error } = await supabase.auth.signUp({ email, password });
		if (error) {
			errorRes = error;
			console.error('Error signing up:', error);
		} else console.log('Success! User signed up', data.user);
	}
</script>

<form on:submit|preventDefault={signUp}>
	<input type="email" bind:value={email} placeholder="Email" />
	<input type="password" bind:value={password} placeholder="Password" />
	<button type="submit">Sign Up</button>
</form>
{#if errorRes}
	<div>Error signing in: {errorRes.message}</div>
{/if}
