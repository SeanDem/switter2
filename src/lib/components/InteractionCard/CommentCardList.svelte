<script lang="ts">
	export let commentDetailList: CommentDetail[];
	import InteractionCard from '$lib/components//InteractionCard/InteractionCard.svelte';
	import type { CommentDetail } from '$lib/server/modules/comments';
</script>

{#if commentDetailList}
	{#each commentDetailList as interaction}
		<div class="border-l border-gray-300 ml-2 pl-2 mb-4">
			<InteractionCard {interaction} />
		</div>
	{/each}
{/if}
