<script lang="ts">
	import CommentCardList from '$lib/components/CommentCardList.svelte';
	import InteractionCard from '$lib/components/InteractionCard.svelte';
	import type { CommentDetail } from '$lib/server/modules/comments';
	import type { Interaction } from '$lib/server/modules/interactions';
	
	export let data: {
		commentDetail: CommentDetail;
		parentInteraction: Interaction;
		commentList: CommentDetail[];
	};
	$: commentDetail = data.commentDetail;
	$: parentInteraction = data.parentInteraction;
	$: commentDetailList = data.commentList;
</script>

<div class="flex flex-col items-center min-h-screen">
	<InteractionCard interaction={commentDetail} type="comment" isMain={true} />
	<CommentCardList {commentDetailList} />
</div>
