<script lang="ts">
	import { goto } from '$app/navigation';
	import type { UserProfile } from '$lib/server/modules/userProfiles';
	import { supabase } from '$lib/supabaseClient';
	let userProfile: UserProfile = {
		name: '',
		handle: '',
		bio: '',
		uid: '',
		email: ''
	};
	let password: string = '';
	let signupError: string = '';

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		const { data, error } = await supabase.auth.signUp({ email: userProfile.email, password });
		if (error) {
			signupError = error.message;
			return;
		}
		const uid = data.user?.id;
		if (!uid) {
			signupError = 'No user ID returned';
			return;
		}

		try {
			const { data, error } = await supabase.from('userprofile').insert([userProfile]).single();
			if (error) {
				signupError = error.message;
				return;
			}
			document.cookie = `uid=${uid}; path=/;`;
			goto('/');
		} catch (error) {
			signupError = 'Failed to create user profile';
		}
	}
</script>

<div>
	<form on:submit|preventDefault={submit}>
		<input required type="email" bind:value={userProfile.email} placeholder="Email" />
		<input required type="password" bind:value={password} placeholder="Password" />
		<input required type="text" bind:value={userProfile.name} placeholder="Name" />
		<input required type="text" bind:value={userProfile.handle} placeholder="Handle" />
		<input type="text" bind:value={userProfile.bio} placeholder="Bio" />
		<button type="submit">Submit</button>
	</form>

	{#if signupError}
		<p style="color: red;">{signupError}</p>
	{/if}
</div>
