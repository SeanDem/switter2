<script lang="ts">
	import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
	import ActionButton from './ActionButton.svelte';
	export let interaction: Interaction;
	const parentType = 'sweet';
</script>

<ActionButton
	{parentType}
	type="like"
	interactionId={interaction.sweet_id}
	count={interaction.likesCount}
/>
<ActionButton
	{parentType}
	type="comment"
	interactionId={interaction.sweet_id}
	count={interaction.commentsCount}
/>
<ActionButton
	{parentType}
	type="resweet"
	interactionId={interaction.sweet_id}
	count={interaction.resweetsCount}
/>
