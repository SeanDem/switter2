<script lang="ts">
	import ActionBar from '$lib/components/ActionBar.svelte';
	import type { SweetDetails } from '$lib/server/modules/sweets';

	export let data: { sweetDetailsList: SweetDetails[] };
	$: sweetDetailsList = data.sweetDetailsList;
</script>

{#if sweetDetailsList}
	{#each sweetDetailsList as sweetDetail}
		<div>{sweetDetail.text}</div>
		<div><ActionBar interaction={sweetDetail} /></div>
	{/each}
{/if}
