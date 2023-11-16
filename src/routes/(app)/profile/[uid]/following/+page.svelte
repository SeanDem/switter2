<script lang="ts">
	export let data;
	$: followingList = data.followingList;
</script>

<h1>Followers</h1>

{#if followingList}
	{#each followingList as follower}
		<div>
			<a href="/profile/{follower.uid}">{follower.name}</a>
		</div>
	{/each}
{:else}
	<div>No followers</div>
{/if}
