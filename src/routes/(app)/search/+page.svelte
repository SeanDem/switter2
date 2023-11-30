<script lang="ts">
	import { enhance } from '$app/forms';
	import type { InteractionType } from '$lib/server/modules/interactions';
	import InteractionCardList from '$lib/components/InteractionCard/InteractionCardList.svelte';

	export let form;
	$: interactionList = form?.interactionList ?? [];

	const interactionTypes: InteractionType[] = ['sweet', 'comment', 'resweet'];

	let selectedCategory: InteractionType = 'sweet';
	let lastSubmitType: InteractionType = 'sweet';
	let submit: boolean = false;

	function handleFormSubmit() {
		submit = true;
		lastSubmitType = selectedCategory;
	}
</script>

<div class="flex justify-center mt-4">
	<form use:enhance method="post" action="?/search" on:submit={handleFormSubmit}>
		<div class="flex justify-center mb-4 space-x-2">
			{#each interactionTypes as type}
				<button
					name="interactionType"
					type="button"
					on:click={() => (selectedCategory = type)}
					class={`btn btn-sm rounded ${selectedCategory === type ? 'btn-primary' : 'btn-outline'}`}
				>
					{type}
				</button>
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
			<button type="submit" class="btn btn-primary rounded"> Search </button>
		</div>
	</form>
</div>

{#if submit}
	<InteractionCardList {interactionList} interactionType={lastSubmitType} />
{/if}
