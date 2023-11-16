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
	<nav>
		<a href="/profile/{userProfile.uid}/sweets">Sweets</a>
		<a href="/profile/{userProfile.uid}/comments">Comments</a>
		<a href="/profile/{userProfile.uid}/resweets">resweets</a>
		<a href="/profile/{userProfile.uid}/followers">Followers</a>
		<a href="/profile/{userProfile.uid}/following">Following</a>
	</nav>
</div>
<slot />

<style>
	nav {
		display: flex;
		justify-content: flex-start;
		background: rgba(255, 255, 255, 0.7);
	}
</style>
