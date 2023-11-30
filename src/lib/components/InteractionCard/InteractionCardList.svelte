<script lang="ts">
	import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
	import InteractionCard from './InteractionCard.svelte';
	export let interactionList: Interaction[];
	export let interactionType: InteractionType;

	type getId = (interaction: Interaction) => string | null | undefined;
	let getId: getId;
	$: {
		if (interactionType === 'sweet') {
			getId = (interaction: Interaction) => interaction.sweetId;
		} else if (interactionType === 'resweet') {
			getId = (interaction: Interaction) => interaction.resweetId;
		} else {
			getId = (interaction: Interaction) => interaction.commentId;
		}
	}
</script>

{#if interactionList.length === 0}
	<div class="flex justify-center mt-4">
		<div class="w-full max-w-md">
			<div class="mb-4">No sweets found</div>
		</div>
	</div>
{:else}
	<div class="flex flex-col items-center min-h-screen">
		{#each interactionList as interaction (getId(interaction))}
			<div class="mt-1">
				<InteractionCard {interaction} {interactionType} />
			</div>
		{/each}
	</div>
{/if}
