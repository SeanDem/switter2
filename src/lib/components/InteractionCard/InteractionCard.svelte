<script lang="ts">
	import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
	import ActionBar from '../actionBar/ActionBar.svelte';
	import InteractionCardBody from './InteractionCardBody.svelte';

	export let parentInteraction: Interaction | null = null;
	export let parentInteractionType: InteractionType | null = null;
	export let interaction: Interaction;
	export let interactionType: InteractionType;
	export let isMain = false;

	let url = '';
	$: {
		if (interactionType === 'sweet') {
			url = `/sweet/${interaction.sweetId}`;
		} else if (interactionType === 'resweet') {
			url = `/resweet/${interaction.resweetId}`;
		} else if (interactionType === 'comment') {
			url = `/comment/${interaction.commentId}`;
		} else {
			url = '/';
		}
	}
</script>

<a href={url}>
	<div class="card rounded-lg {isMain ? 'w-115 my-2 border-slate-300 mb-2' : 'w-96 mt-2 mb-0'}">
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
</a>
