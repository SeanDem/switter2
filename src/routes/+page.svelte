<script lang="ts">
	export let data;
	$: sweetList = data.sweetList;
</script>

{#each sweetList as sweet}
	<div>{sweet.text}</div>
{/each}
