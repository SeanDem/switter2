<script lang="ts">
	export let data;
	$: commentDetailList = data?.commentDetailList;
</script>

<h1>Comments</h1>
{#if commentDetailList}
	{#each commentDetailList as commentDetail}
		<div>{commentDetail.text}</div>
	{/each}
{/if}
