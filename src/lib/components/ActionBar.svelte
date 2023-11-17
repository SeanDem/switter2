<script lang="ts">
	import type { Interaction } from '$lib/server/modules/interactions';
	import ActionButton from './LikeButton.svelte';
	import ActionDialogButton from './ActionDialogButton.svelte';
	export let interaction: Interaction;
</script>

<div class="button-container" />
<ActionButton {interaction} count={interaction.likesCount}/>
<ActionDialogButton
	{interaction}
	type="comment"
	id={interaction.actionId}
	count={interaction.commentsCount}
/>
<ActionDialogButton
	{interaction}
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
