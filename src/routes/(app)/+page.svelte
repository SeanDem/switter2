<script lang="ts">
	import SweetCard from '$lib/components/SweetCard.svelte';
	import type { Interaction } from '$lib/server/modules/interactions';
	export let data: { sweetDetailList: Interaction[] };
	$: sweetDetailList = data.sweetDetailList;
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
	{#each sweetDetailList as interaction (interaction.actionId)}
		<SweetCard {interaction} />
	{/each}
</div>
