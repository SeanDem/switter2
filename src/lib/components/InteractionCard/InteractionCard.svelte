<script lang="ts">
	import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
	import ActionBar from '../actionBar/ActionBar.svelte';
	import InteractionCardBody from './InteractionCardBody.svelte';

	export let parentInteraction: Interaction | null = null;
	export let interaction: Interaction;
	export let isMain = false;
</script>

<a href="/{interaction.type}/{interaction.actionId}">
	<div class="card rounded-lg {isMain ? 'w-115 my-2 border-slate-300 mb-2' : 'w-96 mt-2 mb-0'}">
		{#if parentInteraction}
			<div class="pt-1 border-l border-gray-300 ml-2 pl-2 pb-6 mt-2">
				<InteractionCardBody interaction={parentInteraction} />
				<ActionBar {interaction} />
			</div>
		{/if}
		<InteractionCardBody {interaction} {isMain} />
		<ActionBar {interaction} />
	</div>
</a>
