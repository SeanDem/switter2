<script lang="ts">
	import InteractionCardFocus from '$lib/components/InteractionCard/InteractionCardFocus.svelte';
	import type { CommentDetail } from '$lib/server/modules/comments';
	import type { Interaction } from '$lib/server/modules/interactions';

	export let data: {
		commentDetail: CommentDetail;
		parentInteraction: Interaction;
		commentList: CommentDetail[];
	};
	$: interaction = data.commentDetail;
	$: parentInteraction = data.parentInteraction;
	$: commentDetailList = data.commentList;
</script>

<InteractionCardFocus
	{interaction}
	{commentDetailList}
	interactionType={'comment'}
	{parentInteraction}
	parentInteractionType={'sweet'}
/>
