<script lang="ts">
	import CommentButton from './CommentButton.svelte';
	import LikeButton from './LikeButton.svelte';
	import RetweetButton from './ResweetButton.svelte';
	import type { Interaction } from '$lib/server/modules/interactions';

	export let interaction: Interaction;
</script>

<div class="flex justify-around w-full pt-1">
	<CommentButton {interaction} />
	<RetweetButton {interaction} />
	<LikeButton {interaction} />
</div>
