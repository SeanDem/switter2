<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	let email = '';
	let password = '';

	onMount(async () => {
		const res = await supabase.auth.signUp({
			email: 'test@gmail.com',
			password: 'testpass'
		});
		console.log(res);
	});

	async function signUp(event: SubmitEvent) {
		event.preventDefault();
		const { data, error } = await supabase.auth.signUp({ email, password });
		console.log(data, error);
		if (error) console.error('Error signing up:', error);
		else console.log('Success! User signed up', data.user);
	}
</script>

<div on:submit|preventDefault={signUp}>
	<input type="email" bind:value={email} placeholder="Email" />
	<input type="password" bind:value={password} placeholder="Password" />
	<button type="submit">Sign Up</button>
</div>
