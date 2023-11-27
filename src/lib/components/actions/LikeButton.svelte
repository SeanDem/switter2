<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Interaction } from '$lib/server/modules/interactions';
	import { createInteractionIdRequest } from '$lib/utils/formUtils';

	export let interaction: Interaction;
	$: interactionIdRequest = createInteractionIdRequest(interaction);

	function toggleLike() {
		interaction = {
			...interaction,
			isLiked: !interaction.isLiked,
			likesCount: interaction.isLiked ? interaction.likesCount - 1 : interaction.likesCount + 1
		};
	}
</script>

<form use:enhance method="post">
	<input type="hidden" name="interaction" value={JSON.stringify(interactionIdRequest)} />
	<input type="hidden" name="id" value={interaction.actionId} />
	{#if interaction.isLiked}
		<button class="bg-green-100" on:click={toggleLike} formaction="/?/unlike" name="unlike"
			>unLike: {interaction.likesCount}</button
		>
	{:else}
		<button on:click={toggleLike} formaction="/?/like" name="like"
			>Likes: {interaction.likesCount}</button
		>
	{/if}
</form>
