<script lang="ts">
	import { enhance } from '$app/forms';
	import type { InteractionType } from '$lib/server/modules/interactions';
	import InteractionCardList from '$lib/components/InteractionCard/InteractionCardList.svelte';
	export let form;
	const interactionTypes: InteractionType[] = ['sweet', 'comment', 'resweet'];

	$: interactionList = form?.interactionList ?? [];
	let selectedCategory: InteractionType = 'sweet';
	let submit: boolean = false;
</script>

<div class="flex justify-center mt-3">
	<form
		use:enhance
		method="post"
		action="?/search"
		on:submit={() =>
			setTimeout(() => {
				submit = true;
			}, 300)}
	>
		<div class="flex text-lg font-bold justify-center mb-4 space-x-8">
			{#each interactionTypes as type}
				<div
					on:click={() => (selectedCategory = type)}
					on:keydown={(event) => {
						if (event.key === 'Enter') {
							selectedCategory = type;
						}
					}}
					class={`${selectedCategory === type ? 'border-b-1 border-black' : ''}`}
					role="button"
					tabindex="0"
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</div>
			{/each}
		</div>
		<input type="hidden" name="interactionType" bind:value={selectedCategory} />
		<div class="flex space-x-2">
			<input
				type="text"
				name="search"
				placeholder="Search..."
				class="input input-bordered input-primary flex-1 rounded"
			/>
			<button type="submit" class="btn btn-primary rounded mb-3"> Search </button>
		</div>
	</form>
</div>

{#if submit}
	<InteractionCardList {interactionList} />
{/if}
