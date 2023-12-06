<script lang="ts">
	import InteractionCardList from '$lib/components/InteractionCard/InteractionCardList.svelte';
	export let data;
	$: sweetDetailList = data.sweetDetailList ?? [];
</script>

<InteractionCardList interactionList={sweetDetailList} />
