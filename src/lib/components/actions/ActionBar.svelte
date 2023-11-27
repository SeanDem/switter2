<script lang="ts">
	import type { Interaction } from '$lib/server/modules/interactions';
	import CommentButton from './CommentButton.svelte';
	import ActionButton from './LikeButton.svelte';
	import ResweetButton from './ResweetButton.svelte';
	export let interaction: Interaction;
</script>

<div class="button-container" />
<ActionButton {interaction} />
<ResweetButton {interaction} />
<CommentButton {interaction} />

<style>
	.button-container {
		display: flex;
		align-items: center;
		gap: 20px;
	}
</style>
