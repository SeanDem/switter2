<script lang="ts">
	import { enhance } from '$app/forms';
	import type { InteractionType } from '$lib/server/modules/interactions';

	export let form;
	$: sweetList = form?.sweetList ?? [];

	const interactionTypes: InteractionType[] = ['sweet', 'comment', 'resweet'];
	let selectedCategory: InteractionType = 'sweet';
</script>

<div class="flex justify-center mt-4">
	<form use:enhance method="post" action="/?/search">
		<div class="flex justify-center mb-4 space-x-2">
			{#each interactionTypes as type}
				<button
					type="button"
					on:click={() => (selectedCategory = type)}
					class={`btn btn-sm rounded ${selectedCategory === type ? 'btn-primary' : 'btn-outline'}`}
				>
					{type}
				</button>
			{/each}
		</div>
		<input type="hidden" name="category" bind:value={selectedCategory} />
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

<div class="flex justify-center mt-4">
	<div class="w-full max-w-md">
		{#each sweetList as sweet}
			<div class="mb-4">
				{sweet.text}
			</div>
		{/each}
	</div>
</div>
