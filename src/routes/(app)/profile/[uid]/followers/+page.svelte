<script lang="ts">
	import ProfileCard from '$lib/components/ProfileCard.svelte';

	export let data;
	$: followersList = data.followersList ?? [];
</script>

{#if followersList && followersList.length > 0}
	{#each followersList as userProfile}
		<div class="flex justify-center mb-3">
			<ProfileCard {userProfile} />
		</div>
	{/each}
{:else}
	<div>No followers</div>
{/if}
