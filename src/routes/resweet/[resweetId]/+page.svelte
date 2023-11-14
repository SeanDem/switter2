<script lang="ts">
	import type { CommentDetail } from '$lib/server/modules/comments';
	import type { ResweetDetails } from '$lib/server/modules/resweets';

	export let data: { sweetDetails: ResweetDetails; commentList: CommentDetail[] };
	$: sweetDetail = data.sweetDetails;
	$: commentList = data.commentList;
</script>

<div>
	<div>{sweetDetail.text}</div>

	<br />
	{#if commentList}
		{#each commentList as comment}
			<div>{comment.text}</div>
		{/each}
	{/if}
	<br />
</div>
