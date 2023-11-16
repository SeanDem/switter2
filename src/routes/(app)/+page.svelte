<script lang="ts">
	import ActionBar from '$lib/components/ActionBar.svelte';
	import type { Interaction } from '$lib/server/modules/interactions';
	export let data: { sweetDetailList: Interaction[] };
	$: sweetDetailList = data.sweetDetailList;
</script>

{#each sweetDetailList as sweetDetail}
	<br />
	<div>
		<a href="/profile/{sweetDetail.uid}">Name: {sweetDetail.name}</a>
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
		<a href="/sweet/{sweetDetail.sweetId}">Go To Sweet Page</a>
	</div>
	<br />
{/each}
