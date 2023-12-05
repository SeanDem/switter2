<script lang="ts">
	import InteractionCardList from '$lib/components/InteractionCard/InteractionCardList.svelte';
	
	export let data;
	$: interactionList = data?.commentDetailList;

</script>

<InteractionCardList {interactionList} interactionType="comment" />
