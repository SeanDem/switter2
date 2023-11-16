<script lang="ts">
	export let data;
	$: resweetDetailList = data?.resweetDetailList;
</script>

{#if resweetDetailList}
	{#each resweetDetailList as resweetDetail}
		<div>{resweetDetail.text}</div>
	{/each}
{/if}
