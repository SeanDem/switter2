<script lang="ts">
	import InteractionCardList from '$lib/components/InteractionCard/InteractionCardList.svelte';
	import { selectedHomeCategoryStore } from '$lib/store/store.js';
	export let data;
	$: sweetDetailList =
		$selectedHomeCategoryStore === 'all' ? data.sweetDetailListAll : data.sweetDetailListFollowing;
</script>

<div class="flex text-lg font-bold justify-center mb-4 space-x-8">
	<button
		class="{$selectedHomeCategoryStore === 'following' ? 'border-b-1 border-black' : ''}"
		on:click={() => {
			selectedHomeCategoryStore.set('following');
		}}>Following</button
	>
	<button
		class="{$selectedHomeCategoryStore === 'all' ? 'border-b-1 border-black' : ''}"
		on:click={() => {
			selectedHomeCategoryStore.set('all');
		}}>All</button
	>
</div>
<InteractionCardList interactionList={sweetDetailList ?? []} />
