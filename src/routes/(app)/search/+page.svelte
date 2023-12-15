<script lang="ts">
	import InteractionCardList from '$lib/components/InteractionCard/InteractionCardList.svelte';
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import type { searchType } from '$lib/store/search';
	import { searchStore } from '$lib/store/search';

	const interactionTypes: searchType[] = ['profile', 'sweet', 'resweet', 'comment'];
	$: submit =
		$searchStore.interactionList.length > 0 || $searchStore.profileList.length ? true : false;

	async function handleSubmit() {
		submit = false;
		const state = $searchStore;
		const response = await fetch('/api/search', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				searchText: state.searchText,
				interactionType: state.selectedCategory
			})
		});

		if (response.ok) {
			const data = await response.json();
			searchStore.update((currentState) => {
				return {
					...currentState,
					interactionList: data.interactionList ?? [],
					profileList: data.profileList ?? []
				};
			});
			submit = true;
		}
	}
</script>

<div class="flex justify-center">
	<form on:submit={handleSubmit}>
		<div class="flex text-lg font-bold justify-center mb-4 space-x-8">
			{#each interactionTypes as type}
				<button
					on:click={() => searchStore.update((s) => ({ ...s, selectedCategory: type }))}
					class={$searchStore.selectedCategory === type ? 'border-b-1 border-black' : ''}
					tabindex="0"
				>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</button>
			{/each}
		</div>
		<div class="flex space-x-2">
			<input
				type="text"
				bind:value={$searchStore.searchText}
				placeholder="Search..."
				class="input input-bordered input-primary flex-1 rounded"
			/>
			<button type="submit" class="btn btn-primary rounded mb-3">Search</button>
		</div>
	</form>
</div>

{#if submit}
	{#if $searchStore.selectedCategory === 'profile'}
		{#each $searchStore.profileList as userProfile}
			<div class="flex justify-center mb-3">
				<ProfileCard {userProfile} />
			</div>
		{/each}
	{:else}
		<InteractionCardList interactionList={$searchStore.interactionList} />
	{/if}
{/if}
