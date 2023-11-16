<script lang="ts">
	export let data;
	$: followersList = data.followersList;
</script>

<h1>Followers</h1>

{#if followersList}
	{#each followersList as follower}
		<div>
			<a href="/profile/{follower.uid}">{follower.name}</a>
		</div>
	{/each}
{:else}
	<div>No followers</div>
{/if}
