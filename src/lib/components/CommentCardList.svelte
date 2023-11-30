<script lang="ts">
	export let commentDetailList: CommentDetail[];
	import InteractionCard from '$lib/components/InteractionCard.svelte';
</script>

{#if commentDetailList}
	{#each commentDetailList as interaction}
		<div class="pt-1 border-l border-gray-300 ml-2 pl-2">
			<InteractionCard {interaction} type="comment" />
		</div>
	{/each}
{/if}
