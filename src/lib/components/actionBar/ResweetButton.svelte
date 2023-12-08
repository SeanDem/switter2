<script lang="ts">
	import type { Interaction } from '$lib/server/modules/interactions';
	import type { Resweet } from '$lib/server/modules/resweets';
	import { createInteractionIdRequest } from '$lib/utils/formUtils';
	import { ArrowPathRoundedSquare, Icon } from 'svelte-hero-icons';

	export let interaction: Interaction;
	$: interactionIdRequest = createInteractionIdRequest(interaction);
	$: showDialog = false;
	let text = '';

	function toggle() {
		interaction.isResweeted ? handleResweet() : (showDialog = true);
	}

	async function handleResweet() {
		showDialog = false;
		const resweet: Partial<Resweet> = {
			...interactionIdRequest,
			text
		};
		let res: Response;
		if (interaction.isResweeted) {
			const res = await fetch('/api/action/unresweet', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(resweet)
			});
		} else {
			const res = await fetch('/api/action/resweet', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(resweet)
			});
		}
		interaction = {
			...interaction,
			isResweeted: !interaction.isResweeted,
			resweetsCount: interaction.isResweeted
				? interaction.resweetsCount - 1
				: interaction.resweetsCount + 1
		};
		text = '';
	}
</script>

<button
	on:click={toggle}
	class="flex items-center space-x-1 border-none pl-5 pr-7"
	aria-label="Resweet"
>
	<Icon
		src={ArrowPathRoundedSquare}
		class={`h-7 w-10 ${interaction.isResweeted ? 'text-green-500' : 'text-black'}`}
	/>
	<span class={`text-xs ${interaction.isResweeted ? 'text-green-500' : 'text-black'}`}
		>{interaction.resweetsCount}</span
	>
</button>

{#if showDialog}
	<div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
		<div class="bg-white p-4 rounded shadow-lg w-96">
			<h2 class="text-2xl font-bold mb-4">Write a Resweet</h2>
			<textarea
				class="input input-ghost w-full max-w-xs resize-none h-28 mb-4"
				name="text"
				maxlength="250"
				bind:value={text}
				placeholder="Your resweet..."
			/>
			<div class="flex justify-around">
				<button class="btn rounded rounded" on:click={() => (showDialog = false)}>Cancel</button>
				<button type="submit" class="btn btn-primary rounded" on:click={handleResweet}
					>Submit</button
				>
			</div>
		</div>
	</div>
{/if}
