<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let email = '';
	let password = '';

	async function signIn() {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) console.error('Error signing in:', error);
		else console.log('Success! User signed in', data.user);
	}
</script>

<form on:submit|preventDefault={signIn}>
	<input type="email" bind:value={email} placeholder="Email" />
	<input type="password" bind:value={password} placeholder="Password" />
	<button type="submit">Sign In</button>
</form>
