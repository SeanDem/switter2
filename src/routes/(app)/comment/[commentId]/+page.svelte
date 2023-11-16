<script lang="ts">
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

<div>
	<div>{commentDetail.text}</div>
	<div>{parentInteraction.text}</div>

	<br />
	{#if commentDetailList}
		{#each commentDetailList as comment}
			<div>{comment.text}</div>
		{/each}
	{/if}
	<br />
</div>
