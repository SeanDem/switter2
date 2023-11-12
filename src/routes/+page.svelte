<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SweetDetail } from '$lib/server/modules/sweets';
	import { onMount } from 'svelte';

	export let data: { sweetDetailList: SweetDetail[] };
	$: sweetDetailList = data.sweetDetailList;
</script>

{#each sweetDetailList as sweetDetail}
	<div>
		<button on:click={() => goto(`/sweet/${sweetDetail.sweet_id}`)}>Go To Sweet Page</button>
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
{/each}
