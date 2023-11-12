<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { UserProfile } from '$lib/server/modules/userProfiles';
	import { userStore } from '$lib/store/store';
	import { supabase } from '$lib/supabaseClient';
	export let data: { userProfile: UserProfile };
	$: userProfile = data.userProfile;
	let { handle, name, bio, phone, email, birthday } = data.userProfile;

	async function logout() {
		await supabase.auth.signOut();
		userStore.set(null);
		goto('/');
	}
</script>

{#if userProfile}
	<h1>Profile Settings</h1>
	<form use:enhance method="post">
		<label for="handle">
			Handle:
			<input type="text" name="handle" bind:value={handle} required />
		</label>

		<label for="name">
			Name:
			<input type="string" name="name" bind:value={name} />
		</label>

		<label for="handle">
			bio:
			<input type="text" name="bio" bind:value={bio} />
		</label>

		<label for="phone">
			Phone:
			<input type="tel" name="phone" bind:value={phone} />
		</label>

		<label for="email">
			Email:
			<input type="email" name="email" bind:value={email} required />
		</label>

		<label for="birthday">
			Birthday:
			<input type="date" name="birthday" bind:value={birthday} />
		</label>

		<button type="submit">Save Profile</button>
	</form>
{/if}
<div>
	<button on:click={logout}>Logout</button>
</div>
