<script lang="ts">
	import type { CommentDetail } from '$lib/server/modules/comments';
	import type { ResweetDetails } from '$lib/server/modules/resweets';
	import { onMount } from 'svelte';

	export let data: { resweetDetail: ResweetDetails; commentDetailList: CommentDetail[] };
	$: resweetDetail = data.resweetDetail;
	$: commentDetailList = data.commentDetailList;
</script>

<div>
	<div>{resweetDetail.text}</div>
	<br />
	{#if commentDetailList}
		{#each commentDetailList as comment}
			<div>{comment.text}</div>
		{/each}
	{/if}
	<br />
</div>
