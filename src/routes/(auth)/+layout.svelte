<script lang="ts">
	import { onMount } from 'svelte';

	export let form;
	export let data;
	$: ({ supabase } = data);
	onMount(async () => {
		console.log('session m: ' + (await supabase.auth.getSession()));
	});
</script>

<slot />
{#if form?.message}
	<div>{form?.message}</div>
{/if}
