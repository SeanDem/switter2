<script lang="ts">
	import { goto } from '$app/navigation';
	import type { UserProfile } from '$lib/server/modules/userProfiles';
	export let data: { userProfile: UserProfile };
	$: userProfile = data.userProfile;

	async function settings() {
		goto('/profile/settings');
	}
</script>

<div>
	<h1>Your Profile Page</h1>
	<button on:click={settings}>Settings</button>
	<p>Handle: {userProfile.handle}</p>
</div>
<slot />
