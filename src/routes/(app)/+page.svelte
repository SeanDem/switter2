<script lang="ts">
	import InteractionCardList from '$lib/components/InteractionCard/InteractionCardList.svelte';
	export let data;
	$: sweetDetailList =
		selectedCategory === 'all' ? data.sweetDetailListAll : data.sweetDetailListFollowing;
	let selectedCategory: string = 'following';
</script>

<div class="flex text-lg font-bold justify-center mb-4 space-x-8">
	<button
		class="test {selectedCategory === 'following' ? 'border-b-1 border-black' : ''}"
		on:click={() => {
			selectedCategory = 'following';
		}}>Following</button
	>
	<button
		class="test {selectedCategory === 'all' ? 'border-b-1 border-black' : ''}"
		on:click={() => {
			selectedCategory = 'all';
		}}>All</button
	>
</div>
<InteractionCardList interactionList={sweetDetailList ?? []} />
