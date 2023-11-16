<script lang="ts">
	export let data;
	$: sweetDetailList = data?.sweetDetailList;
</script>

<h1>Sweets</h1>
{#if sweetDetailList}
	{#each sweetDetailList as sweetDetail}
		<div>{sweetDetail.text}</div>
	{/each}
{/if}
