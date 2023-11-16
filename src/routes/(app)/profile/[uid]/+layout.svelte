<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	export let data;
	$: userProfile = data.userProfile;
	$: isUserProfile = data.isUserProfile;
</script>

{#if isUserProfile}
	<h1>Your Profile Page</h1>
	<div>
		<a href="/profile/{userProfile.uid}/settings">Settings</a>
	</div>
{/if}
<div>
	<div>{userProfile.name} Profile Page</div>
	<p>Handle: {userProfile.handle}</p>
	<p>UID: {userProfile.uid}</p>
	<form use:enhance method="post">
		<input type="hidden" name="otherUid" value={userProfile.uid} />
		<button formaction="?/follow">follow</button>
		<button formaction="?/unfollow">unfollow</button>
	</form>
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
