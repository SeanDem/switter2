<script lang="ts">
	import { onMount } from 'svelte';

	export let data;
</script>

<ul>
	{#each data.countries as country}
		<li>{country.name}</li>
	{/each}
</ul>
