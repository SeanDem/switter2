<script lang="ts">
	import SweetCard from '$lib/components/InteractionCard.svelte';
	import type { Interaction } from '$lib/server/modules/interactions';
	export let data: { sweetDetailList: Interaction[] };
	$: sweetDetailList = data.sweetDetailList;
</script>

<div class="flex flex-col items-center min-h-screen">
	{#each sweetDetailList as interaction (interaction.actionId)}
		<div class="mt-1">
			<SweetCard {interaction} />
		</div>
	{/each}
</div>
