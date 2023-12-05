<script lang="ts">
	import ProfileCard from '$lib/components/ProfileCard.svelte';

	export let data;
	$: followersList = data.followersList;
</script>

{#if followersList}
	{#each followersList as userProfile}
		<div class="flex justify-center">
			<ProfileCard {userProfile} />
		</div>
	{/each}
{:else}
	<div>No followers</div>
{/if}
