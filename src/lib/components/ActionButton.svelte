<script lang="ts">
	import { enhance } from '$app/forms';
	import type { InteractionType } from '$lib/server/modules/interactions';

	export let type: 'like' | 'comment' | 'resweet';
	export let parentType: InteractionType;
	export let id: string;
	export let count: number;
</script>

<form use:enhance method="post" action={`/?/${type}`}>
	<input type="hidden" name="type" value={parentType} />
	<input type="hidden" name="id" value={id} />
	<button type="submit" name={type} value={type}
		>{type.charAt(0).toUpperCase() + type.slice(1)}s: {count}</button
	>
</form>
