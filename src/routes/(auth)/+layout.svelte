<script lang="ts">
		export let form;
</script>

<slot />
{#if form?.message}
	<div>{form?.message}</div>
{/if}
