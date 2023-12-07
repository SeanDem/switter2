<script lang="ts">
	import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
	import ActionBar from '../actionBar/ActionBar.svelte';
	import InteractionCardBody from './InteractionCardBody.svelte';

	export let parentInteraction: Interaction | null = null;
	export let interaction: Interaction | null;
	export let isMain = false;
</script>

<div class="card rounded-lg border-1 {isMain ? 'w-115 mb-2 border-slate-300' : 'w-96 '}">
	{#if parentInteraction}
		<div class=" border-l border-gray-300pt-0 pl-1 pb-6 ml-6 mt-2">
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
