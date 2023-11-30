<script lang="ts">
	import type { CommentDetail } from '$lib/server/modules/comments';
	import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
	import InteractionCard from '$lib/components//InteractionCard/InteractionCard.svelte';

	export let commentDetailList: CommentDetail[];
	export let interaction: Interaction;
	export let interactionType: InteractionType;

	export let parentInteraction: Interaction | null = null;
	export let parentInteractionType: InteractionType | null = null;
</script>

<div class="flex flex-col items-center min-h-screen">
	<InteractionCard
		{interaction}
		isMain={true}
		{interactionType}
		{parentInteraction}
		{parentInteractionType}
	/>
	{#if commentDetailList}
		{#each commentDetailList as interaction}
			<div class="pt-1 border-l border-gray-300 ml-2 pl-2">
				<InteractionCard {interaction} interactionType="comment" />
			</div>
		{/each}
	{/if}
</div>
