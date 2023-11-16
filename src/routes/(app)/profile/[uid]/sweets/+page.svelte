<script lang="ts">
	export let data;
	$: sweetDetailList = data?.sweetDetailList;
</script>

{#if sweetDetailList}
	{#each sweetDetailList as sweetDetail}
		<div>{sweetDetail.text}</div>
	{/each}
{/if}
