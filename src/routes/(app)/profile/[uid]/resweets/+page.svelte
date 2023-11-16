<script lang="ts">
	export let data;
	$: resweetDetailList = data?.resweetDetailList;
</script>

<h1>Resweets</h1>
{#if resweetDetailList}
	{#each resweetDetailList as resweetDetail}
		<div>{resweetDetail.text}</div>
	{/each}
{/if}
