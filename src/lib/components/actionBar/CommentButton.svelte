<script lang="ts">
	import type { SweetComment } from '$lib/server/modules/comments';
	import type { Interaction } from '$lib/server/modules/interactions';
	import { createInteractionIdRequest } from '$lib/utils/formUtils';
	import { ChatBubbleLeft, Icon } from 'svelte-hero-icons';

	export let interaction: Interaction;
	$: interactionIdRequest = createInteractionIdRequest(interaction);
	let showDialog = false;
	let text = '';

	async function handleComment() {
		showDialog = false;
		const comment: Partial<SweetComment> = {
			...interactionIdRequest,
			text
		};
		const res = await fetch('/api/action/comment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(comment)
		});
		text = '';
		interaction = {
			...interaction,
			isCommented: true,
			commentsCount: interaction.isCommented
				? interaction.commentsCount - 1
				: interaction.commentsCount + 1
		};
	}
</script>

<form>
	<button
		class="flex items-center space-x-1 border-none pl-5 pr-7"
		aria-label="Comment"
		on:click={() => (showDialog = true)}
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
		<div class="relative bg-white p-4 rounded shadow-lg w-96">
			<button
				class="absolute top-0 right-0 m-2 btn btn-circle btn-sm"
				on:click={() => (showDialog = false)}
			>
				×
			</button>
			<h2 class="text-2xl font-bold mb-3">Write a Comment</h2>
			<textarea
				bind:value={text}
				class="input input-ghost w-full max-w-xs resize-none h-24 mb-3"
				name="text"
				maxlength="250"
				placeholder="Your comment..."
			/>
			<div class="flex justify-between">
				<button class="btn rounded" on:click={() => (showDialog = false)}>Cancel</button>
				<button class="btn btn-primary rounded" on:click={handleComment}>Submit</button>
			</div>
		</div>
	</div>
{/if}
