<script lang="ts">
	export let data;
	$: commentDetailList = data?.commentDetailList;
</script>

{#if commentDetailList}
	{#each commentDetailList as commentDetail}
		<div>{commentDetail.text}</div>
	{/each}
{/if}
