<script lang="ts">
	import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
	import ActionButton from './ActionButton.svelte';
	import ActionDialogButton from './ActionDialogButton.svelte';
	export let interaction: Interaction;
	const parentType = 'sweet';
</script>

<ActionButton
	{parentType}
	type="like"
	interactionId={interaction.sweetId}
	count={interaction.likesCount}
/>
<ActionDialogButton
	{parentType}
	type="comment"
	interactionId={interaction.sweetId}
	count={interaction.commentsCount}
/>
<ActionDialogButton
	{parentType}
	type="resweet"
	interactionId={interaction.sweetId}
	count={interaction.resweetsCount}
/>
