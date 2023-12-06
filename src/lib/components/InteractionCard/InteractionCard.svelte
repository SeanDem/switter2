<script lang="ts">
	import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
	import ActionBar from '../actionBar/ActionBar.svelte';
	import InteractionCardBody from './InteractionCardBody.svelte';

	export let parentInteraction: Interaction | null = null;
	export let interaction: Interaction;
	export let isMain = false;
</script>

<div class="card rounded-lg pb-1 {isMain ? 'w-115 my-2 border-slate-300 mb-2' : 'w-96 mt-0 mb-0'}">
	{#if parentInteraction}
		<div class="pt-1 border-l border-gray-300 ml-2 pl-2 pb-6 mt-2">
			<a href="/{parentInteraction.type}/{parentInteraction.actionId}">
				<InteractionCardBody interaction={parentInteraction} />
				<ActionBar {interaction} />
			</a>
		</div>
	{/if}
	<a href="/{interaction.type}/{interaction.actionId}">
		<InteractionCardBody {interaction} {isMain} />
	</a>
	<ActionBar {interaction} />
</div>
