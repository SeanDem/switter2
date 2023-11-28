<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Interaction } from '$lib/server/modules/interactions';
	import { createInteractionIdRequest } from '$lib/utils/formUtils';
	import { ArrowPathRoundedSquare, Icon } from 'svelte-hero-icons';

	export let interaction: Interaction;
	$: interactionIdRequest = createInteractionIdRequest(interaction);
	$: showDialog = false;
	let text = '';

	function handleResweet(event: Event) {
		if (interaction.isResweeted) {
			event.preventDefault();
			toggle();
		} else {
			showDialog = true;
		}
	}
	function toggle() {
		showDialog = false;
		interaction = {
			...interaction,
			isLiked: !interaction.resweetId,
			likesCount: interaction.isResweeted
				? interaction.resweetsCount - 1
				: interaction.resweetsCount + 1
		};
	}
</script>

<form use:enhance method="post" on:submit={handleResweet}>
	<input type="hidden" name="interaction" value={JSON.stringify(interactionIdRequest)} />
	<button
		class="flex items-center space-x-1 border-none"
		aria-label="Comment"
		formaction="/?/unresweet"
	>
		<Icon
			src={ArrowPathRoundedSquare}
			class={`h-6 w-6 ${interaction.isResweeted ? 'text-green-500' : 'text-black'}`}
		/>
		<span class={`text-xs ${interaction.isResweeted ? 'text-green-500' : 'text-black'}`}
			>{interaction.resweetsCount}</span
		>
	</button>
</form>

{#if showDialog}
	<div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
		<div class="bg-white p-4 rounded shadow-lg w-96">
			<h2 class="text-2xl font-bold mb-4">Write a Resweet</h2>
			<form use:enhance method="post" action="/?/resweet" on:submit={toggle}>
				<textarea
					class="input input-ghost w-full max-w-xs resize-none h-28"
					name="text"
					maxlength="150"
					bind:value={text}
					placeholder="Your resweet..."
				/>
				<input type="hidden" name="interaction" value={JSON.stringify(interactionIdRequest)} />
				<div class="flex justify-around">
					<button class="btn rounded rounded" on:click={() => (showDialog = false)}>Cancel</button>
					<button type="submit" class="btn btn-primary rounded">Submit</button>
				</div>
			</form>
		</div>
	</div>
{/if}
