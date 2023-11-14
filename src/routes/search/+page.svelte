<script lang="ts">
	import { enhance } from '$app/forms';
	import type { InteractionType } from '$lib/server/modules/interactions';

	export let form;
	$: sweetList = form?.sweetList ?? [];

	const interactionTypes: InteractionType[] = ['sweet', 'comment', 'resweet'];
	let selectedCategory: InteractionType = 'sweet';
</script>

<form use:enhance method="post" action="?/search">
	<div class="category-buttons">
		{#each interactionTypes as type}
			<label>
				<input type="radio" bind:group={selectedCategory} value={type} name="interactionType" />
				{type}
			</label>
		{/each}
	</div>
	<input type="hidden" name="category" bind:value={selectedCategory} />
	<input type="text" name="search" placeholder="Search..." />
	<button>Search</button>
</form>

<div>
	{#each sweetList as sweet}
		<div>
			{sweet.text}
		</div>
	{/each}
</div>

<style>
	.category-buttons {
		margin-bottom: 10px;
	}
	.category-buttons label {
		margin-right: 10px;
	}
</style>
