<script lang="ts">
	import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
	import InteractionCard from './InteractionCard.svelte';
	export let interactionList: Interaction[];
</script>

{#if interactionList.length === 0}
	<div class="flex justify-center mt-2">
		<div class="w-full max-w-md">
			<div class="mb-4">None found</div>
		</div>
	</div>
{:else}
	<div class="flex flex-col items-center min-h-screen">
		{#each interactionList as interaction}
			<div class="mt-1">
				<InteractionCard {interaction} />
			</div>
		{/each}
	</div>
{/if}
