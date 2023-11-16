<script lang="ts">
	import { enhance } from '$app/forms';
	export let data;

	$: userProfile = data.userProfile;
	$: isUserProfile = data.isUserProfile;
</script>

{#if isUserProfile}
	<h1>Your Profile Page</h1>
	<div>
		<a href="/profile/{userProfile.uid}/settings">Settings</a>
	</div>
{:else}
	<div>
		<div>{userProfile.name} Profile Page</div>
		<p>Handle: {userProfile.handle}</p>
		<p>UID: {userProfile.uid}</p>
		<form use:enhance method="post">
			<input type="hidden" name="otherUid" value={userProfile.uid} />
			{#if userProfile.isFollowing}
				<button formaction="/profile/?/unfollow">unfollow</button>
			{:else}
				<button formaction="/profile/?/follow">follow</button>
			{/if}
		</form>
	</div>
{/if}

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
