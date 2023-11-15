<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';

	let email = '';
	let password = '';
	let loginError: string = '';

	async function submit() {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			loginError = error.message;
			return;
		}
		document.cookie = `uid=${data.user.id}; path=/;`;
		goto('/');
	}
</script>

<div>
	<form on:submit|preventDefault={submit}>
		<input required type="email" name="email" placeholder="Email" bind:value={email} />
		<input required type="password" name="password" placeholder="Password" bind:value={password} />
		<button type="submit">Submit</button>
	</form>

	{#if loginError}
		<p style="color: red;">{loginError}</p>
	{/if}
</div>
