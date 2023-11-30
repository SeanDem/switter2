<script lang="ts">
	import InteractionCardList from '$lib/components/InteractionCard/InteractionCardList.svelte';
	import type { Interaction } from '$lib/server/modules/interactions';
	export let data: { sweetDetailList: Interaction[] };
	$: sweetDetailList = data.sweetDetailList;
</script>

<InteractionCardList interactionList={sweetDetailList} interactionType={'sweet'} />
