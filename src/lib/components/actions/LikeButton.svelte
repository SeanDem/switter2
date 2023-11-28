<script lang="ts">
	import { enhance } from '$app/forms';
	import { Heart, Icon } from 'svelte-hero-icons';
	import type { Interaction } from '$lib/server/modules/interactions';
	import { createInteractionIdRequest } from '$lib/utils/formUtils';
	import { afterUpdate } from 'svelte';

	export let interaction: Interaction;
	$: interactionIdRequest = createInteractionIdRequest(interaction);
	function handleLike() {
		interaction = {
			...interaction,
			isLiked: !interaction.isLiked,
			likesCount: interaction.isLiked ? interaction.likesCount - 1 : interaction.likesCount + 1
		};
	}
</script>

<form use:enhance method="post" on:submit={handleLike}>
	<input type="hidden" name="interaction" value={JSON.stringify(interactionIdRequest)} />
	<input type="hidden" name="id" value={interaction.actionId} />

	<button
		class="flex items-center space-x-1 border-none"
		aria-label="Like"
		formaction={interaction.isLiked ? '/?/unlike' : '/?/like'}
	>
		<Icon src={Heart} class={`h-6 w-6 ${interaction.isLiked ? 'text-pink-500' : 'text-black'}`} />
		<span class={`text-xs ${interaction.isLiked ? 'text-pink-500' : 'text-black'}`}
			>{interaction.likesCount}</span
		>
	</button>
</form>
