<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Interaction } from '$lib/server/modules/interactions';

	export let data: { sweetDetailList: Interaction[] };
	$: sweetDetailList = data.sweetDetailList;
</script>

{#each sweetDetailList as sweetDetail}
	<br />
	<div>
		<span>Name: {sweetDetail.name}</span>
		<span>Handle: {sweetDetail.handle}</span>
	</div>
	<br />
	<div>{sweetDetail.text}</div>
	<br />
	<div>
		<span>Likes {sweetDetail.likesCount}</span>
		<span>Comments {sweetDetail.commentsCount}</span>
		<span>Resweets {sweetDetail.resweetsCount}</span>
	</div>
	<button on:click={() => goto(`/sweet/${sweetDetail.sweet_id}`)}>Go To Sweet Page</button>
	<br />
{/each}
