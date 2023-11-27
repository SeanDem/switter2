<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Interaction } from '$lib/server/modules/interactions';
	import { createInteractionIdRequest } from '$lib/utils/formUtils';

	export let interaction: Interaction;
	$: interactionIdRequest = createInteractionIdRequest(interaction);
	let showDialog = false;
	let text = '';

	function toggleReSweet() {
		interaction = {
			...interaction,
			isResweeted: !interaction.isResweeted,
			resweetsCount: interaction.isResweeted
				? interaction.resweetsCount - 1
				: interaction.resweetsCount + 1
		};
		showDialog = false;
	}
</script>

{#if !interaction.isResweeted}
	<button on:click={() => (showDialog = true)}>
		ReSweets: {interaction.resweetsCount}
	</button>
{/if}

<form use:enhance method="post" on:submit={toggleReSweet}>
	{#if interaction.isResweeted}
		<input type="hidden" name="interaction" value={JSON.stringify(interactionIdRequest)} />
		<button class="bg-green-100" type="submit" formaction="/?/unresweet"
			>unResweet: {interaction.resweetsCount}</button
		>
	{/if}
</form>

<form use:enhance method="post" on:submit={toggleReSweet}>
	{#if showDialog}
		<div class="dialog-overlay">
			<div class="dialog">
				<h2>Write a Resweet</h2>
				<input type="hidden" name="interaction" value={JSON.stringify(interactionIdRequest)} />
				<textarea name="text" bind:value={text} />
				<button type="submit" formaction="/?/resweet">Submit</button>
				<button
					type="button"
					on:click={() => {
						showDialog = false;
						text = '';
					}}>Cancel</button
				>
			</div>
		</div>
	{/if}
</form>

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
