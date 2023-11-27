<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Interaction } from '$lib/server/modules/interactions';
	import { createInteractionIdRequest } from '$lib/utils/formUtils';
	
	export let interaction: Interaction;
	$: interactionIdRequest = createInteractionIdRequest(interaction);
	let showDialog = false;
	let text = '';

	function toggleComment() {
		interaction = {
			...interaction,
			isLiked: !interaction.commentId,
			likesCount: interaction.isCommented
				? interaction.commentsCount - 1
				: interaction.commentsCount + 1
		};
	}
</script>

<button on:click={() => (showDialog = true)}>
	Comments: {interaction.commentsCount}
</button>

{#if showDialog}
	<div class="dialog-overlay">
		<div class="dialog">
			<h2>Write a Comment</h2>
			<form use:enhance method="post">
				<textarea name="text" bind:value={text} />
				<input type="hidden" name="interaction" value={JSON.stringify(interactionIdRequest)} />
				<button on:click={toggleComment} formaction="/?/comment">Submit</button>
			</form>
			<button on:click={() => (showDialog = false)}>Cancel</button>
		</div>
	</div>
{/if}

<style>
	.dialog-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
	.dialog {
		background: white;
		padding: 20px;
		border-radius: 5px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
</style>
