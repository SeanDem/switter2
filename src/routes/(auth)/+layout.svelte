<script lang="ts">
	export let form;
	let signIn = true;
</script>

<slot />
{#if form?.message}
	<div>{form?.message}</div>
{/if}
