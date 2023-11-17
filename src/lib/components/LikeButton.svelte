<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Interaction } from '$lib/server/modules/interactions';
	import { createInteractionIdRequest } from '$lib/utils/formUtils';

	export let interaction: Interaction;
	export let count: number;
	$: interactionIdRequest = createInteractionIdRequest(interaction);
</script>

<form use:enhance method="post">
	<input type="hidden" name="interaction" value={JSON.stringify(interactionIdRequest)} />
	<input type="hidden" name="id" value={interaction.actionId} />
	<div>{interaction.isLiked}</div>
	{#if interaction.isLiked}
		<button class="bg-green-100" formaction="/?/unlike" name="unlike">unLike: {count}</button>
	{:else}
		<button formaction="/?/like" name="like">Likes: {count}</button>
	{/if}
</form>
