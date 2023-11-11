<script lang="ts">
	import { goto } from '$app/navigation';
	import type { UserProfile } from '$lib/server/modules/userProfiles';
	import { userStore } from '$lib/store/store';
	import { supabase } from '$lib/supabaseClient';
	export let data: { userProfile: UserProfile };
	$: userProfile = data.userProfile;
	
	const user = userStore;

	async function logout() {
		await supabase.auth.signOut();
		userStore.set(null);
		goto('/');
	}
</script>

{#if $user}
	<div>
		<h1>Profile</h1>
		<p>Email: {$user.email}</p>

		<button on:click={logout}>Logout</button>
	</div>
{:else}
	<p>Loading profile...</p>
{/if}
