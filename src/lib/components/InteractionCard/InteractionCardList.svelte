<script lang="ts">
	import type { Interaction } from '$lib/server/modules/interactions';
	import InteractionCard from './InteractionCard.svelte';
	export let interactionList: Interaction[] | null;
</script>

{#if interactionList && interactionList.length > 0}
	<div class="flex flex-col items-center min-h-screen">
		{#each interactionList as interaction}
			<div class="mb-4">
				<InteractionCard {interaction} />
			</div>
		{/each}
	</div>
{:else}
	<div class="flex justify-center">
		<div class="w-full max-w-md">None found</div>
	</div>
{/if}
