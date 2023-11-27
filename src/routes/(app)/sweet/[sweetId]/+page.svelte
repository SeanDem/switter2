<script lang="ts">
	import { goto } from '$app/navigation';
	import ActionBar from '$lib/components/actions/ActionBar.svelte';
	import type { CommentDetail } from '$lib/server/modules/comments';
	import type { Interaction } from '$lib/server/modules/interactions';
	import type { SweetDetails } from '$lib/server/modules/sweets';

	export let data: { sweetDetails: Interaction; commentList: CommentDetail[] };
	$: sweetDetail = data.sweetDetails;
	$: commentList = data.commentList;
</script>

<div>
	<div>{sweetDetail.text}</div>
	<ActionBar interaction={sweetDetail} />

	<br />
	{#if commentList}
		{#each commentList as comment}
			<div>{comment.text}</div>
			<div>{comment.commentId}</div>
			<a href="/comment/{comment.commentId}">goto comment</a>
		{/each}
	{/if}
	<br />
</div>
