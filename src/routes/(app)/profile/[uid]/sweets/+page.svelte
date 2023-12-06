<script lang="ts">
	import InteractionCardList from '$lib/components/InteractionCard/InteractionCardList.svelte';
	export let data;

	$: interactionList = data?.sweetDetailList ?? [];
</script>

<InteractionCardList {interactionList} />
