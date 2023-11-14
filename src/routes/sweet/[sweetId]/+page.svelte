<script lang="ts">
	import type { CommentDetail } from '$lib/server/modules/comments';
	import type { Interaction } from '$lib/server/modules/interactions';
	import type { SweetDetails } from '$lib/server/modules/sweets';

	export let data: { sweetDetails: SweetDetails; commentList: CommentDetail[] };
	$: sweetDetails = data.sweetDetails;
	$: commentList = data.commentList;
</script>

<div>
	<div>{sweetDetails.text}</div>
	<br />
	{#if commentList}
		{#each commentList as comment}
			<div>{comment.text}</div>
		{/each}
	{/if}
	<br />
</div>
