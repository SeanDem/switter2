<script lang="ts">
	import type { InteractionType } from '$lib/server/modules/interactions';
	import CommentButton from './CommentButton.svelte';
	import LikeButton from './LikeButton.svelte';
	import RetweetButton from './ResweetButton.svelte';
	import type { Interaction } from '$lib/server/modules/interactions';

	export let interaction: Interaction | null;
	$: interactionClean = interaction ?? {
		actionId: '',
		uid: '',
		name: '',
		handle: '',
		profileUrl: '',
		text: '',
		timestamp: '',
		type: 'sweet' as InteractionType,
		likesCount: 0,
		resweetsCount: 0,
		commentsCount: 0,
		isLiked: false,
		isCommented: false,
		isResweeted: false
	};
</script>

<div class="flex justify-around w-full mb-1">
	<CommentButton interaction={interactionClean} />
	<RetweetButton interaction= {interactionClean} />
	<LikeButton interaction = {interactionClean} />
</div>
