<script lang="ts">
	import { ChatBubbleLeft, Icon } from 'svelte-hero-icons';
	import type { Interaction } from '$lib/server/modules/interactions';
	import { createInteractionIdRequest } from '$lib/utils/formUtils';
	import { enhance } from '$app/forms';

	export let interaction: Interaction;
	$: interactionIdRequest = createInteractionIdRequest(interaction);
	let showDialog = false;
	let text = '';

	async function handleComment(event: Event) {
		const res = await fetch('api/action/comment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ interactionIdRequest, text })
		});
		showDialog = false;
		interaction = {
			...interaction,
			isLiked: !interaction.commentId,
			likesCount: interaction.isCommented
				? interaction.commentsCount - 1
				: interaction.commentsCount + 1
		};
	}
</script>

<form>
	<button
		class="flex items-center space-x-1 border-none pl-5 pr-7"
		aria-label="Comment"
		on:click|stopPropagation={() => (showDialog = true)}
	>
		<Icon
			src={ChatBubbleLeft}
			class={`h-7 w-10 ${interaction?.isCommented ? 'text-blue-500' : 'text-black'}`}
		/>
		<span class={`text-xs ${interaction?.isCommented ? 'text-blue-500' : 'text-black'}`}
			>{interaction?.commentsCount}</span
		>
	</button>
</form>
{#if showDialog}
	<div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
		<div class="bg-white p-4 rounded shadow-lg w-96">
			<h2 class="text-2xl font-bold mb-4">Write a Comment</h2>
			<form use:enhance method="post" on:submit={handleComment}>
				<textarea
					class="input input-ghost w-full max-w-xs resize-none h-28 mb-4"
					name="text"
					maxlength="250"
					bind:value={text}
					placeholder="Your comment..."
				/>
				<input type="hidden" name="interaction" value={JSON.stringify(interactionIdRequest)} />
				<div class="flex justify-around">
					<button class="btn rounded" on:click|stopPropagation={() => (showDialog = false)}
						>Cancel</button
					>
					<button class="btn btn-primary rounded" on:click|stopPropagation formaction="/?/comment"
						>Submit</button
					>
				</div>
			</form>
		</div>
	</div>
{/if}
