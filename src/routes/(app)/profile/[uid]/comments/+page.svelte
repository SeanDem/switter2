<script lang="ts">
	import InteractionCardList from '$lib/components/InteractionCard/InteractionCardList.svelte';
	import { onMount } from 'svelte';

	export let data;
	$: interactionList = data?.commentDetailList;

	onMount(() => {
		console.log(interactionList);
	});
</script>

<InteractionCardList {interactionList} interactionType="comment" />
