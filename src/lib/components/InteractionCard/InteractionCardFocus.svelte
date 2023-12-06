<script lang="ts">
	import InteractionCard from '$lib/components//InteractionCard/InteractionCard.svelte';
	import type { CommentDetail } from '$lib/server/modules/comments';
	import type { Interaction } from '$lib/server/modules/interactions';

	export let commentDetailList: CommentDetail[] | [];
	export let interaction: Interaction | null;
	export let parentInteraction: Interaction | null = null;
</script>

<div class="flex flex-col items-center min-h-screen">
	<InteractionCard isMain={true} {interaction} {parentInteraction} />
	{#if commentDetailList}
		{#each commentDetailList as interaction}
			<div class="border-l border-gray-300 pt-1 ml-5 pl-7">
				<InteractionCard {interaction} />
			</div>
		{/each}
	{/if}
</div>
