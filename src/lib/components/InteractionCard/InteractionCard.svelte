<script lang="ts">
	import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
	import ActionBar from '../actionBar/ActionBar.svelte';
	import InteractionCardBody from './InteractionCardBody.svelte';

	export let parentInteraction: Interaction | null = null;
	export let parentInteractionType: InteractionType | null = null;
	export let interaction: Interaction;
	export let interactionType: InteractionType;
	export let isMain = false;
</script>

<div
	class="card card-bordered shadow-s py-1 m-0 {isMain
		? 'w-110 py-2 my-1 border-slate-400	'
		: 'w-96'}"
>
	{#if parentInteraction && parentInteractionType}
		<div class="pt-1 border-l border-gray-300 ml-2 pl-2 pb-6 mt-2">
			<InteractionCardBody
				interaction={parentInteraction}
				interactionType={parentInteractionType}
			/>
			<ActionBar {interaction} />
		</div>
	{/if}
	<InteractionCardBody {interaction} {interactionType} {isMain} />
	<ActionBar {interaction} />
</div>
