<script lang="ts">
	import type { Interaction } from '$lib/server/modules/interactions';
	import ActionButton from './ActionButton.svelte';
	import ActionDialogButton from './ActionDialogButton.svelte';
	export let interaction: Interaction;
	const parentType = 'sweet';
</script>

<div class="button-container" />
<ActionButton {parentType} type="like" id={interaction.actionId} count={interaction.likesCount} />
<ActionDialogButton
	{parentType}
	type="comment"
	id={interaction.actionId}
	count={interaction.commentsCount}
/>
<ActionDialogButton
	{parentType}
	type="resweet"
	id={interaction.actionId}
	count={interaction.resweetsCount}
/>

<style>
	.button-container {
		display: flex;
		align-items: center;
		gap: 20px;
	}
</style>
