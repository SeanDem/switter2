<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	import type { CommentDetail } from '$lib/server/modules/comments';
	import type { SweetDetails } from '$lib/server/modules/sweets';

	export let data: { sweetDetails: SweetDetails; commentList: CommentDetail[] };
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
