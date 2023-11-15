<script lang="ts">
	import { goto } from '$app/navigation';
	export let data;
	$: userProfile = data.userProfile;
	$: isUserProfile = data.isUserProfile;

	async function settings() {
		goto(`/profile/${userProfile.uid}/settings`);
	}
</script>

{#if isUserProfile}
	<h1>Your Profile Page</h1>
	<div>
		<button on:click={settings}>Settings</button>
	</div>
{/if}
<div>
	<div>{userProfile.name} Profile Page</div>
	<p>Handle: {userProfile.handle}</p>
	<p>UID: {userProfile.uid}</p>
</div>
<div>
	<button on:click={() => goto(`/profile/${userProfile.uid}/followers`)}>Followers</button>
	<button on:click={() => goto(`/profile/${userProfile.uid}/following`)}>Following</button>
	<button on:click={() => goto(`/profile/${userProfile.uid}/sweets`)}>Sweets</button>
	<button on:click={() => goto(`/profile/${userProfile.uid}/comments`)}>Comments</button>
	<button on:click={() => goto(`/profile/${userProfile.uid}/resweets`)}>resweets</button>
</div>
<slot />
