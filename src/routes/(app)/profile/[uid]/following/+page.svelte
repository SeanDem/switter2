<script lang="ts">
	import ProfileCard from '$lib/components/ProfileCard.svelte';

	export let data;
	$: followingList = data.followingList;
</script>

{#if followingList}
	{#each followingList as userProfile}
		<div class="flex justify-center">
			<ProfileCard {userProfile} />
		</div>
	{/each}
{:else}
	<div>No followers</div>
{/if}
