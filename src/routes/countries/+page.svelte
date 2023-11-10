<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		try {
			console.log('onMount');
			// your onMount code
		} catch (error) {
			console.error('onMount error:', error);
		}
	});
</script>

<ul>
	{#each data.countries as country}
		<li>{country.name}</li>
	{/each}
</ul>
