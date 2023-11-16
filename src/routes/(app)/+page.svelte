<script lang="ts">
	import { goto } from '$app/navigation';
	import ActionBar from '$lib/components/ActionBar.svelte';
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
		<ActionBar interaction={sweetDetail} />
	</div>
	<div>
		<button on:click={() => goto(`/sweet/${sweetDetail.sweetId}`)}>Go To Sweet Page</button>
	</div>
	<br />
{/each}

