<script lang="ts">
	import SweetCard from '$lib/components/SweetCard.svelte';
	import type { Interaction } from '$lib/server/modules/interactions';

	export let data: { sweetDetails: Interaction; commentList: Interaction[] };
	$: sweetDetail = data.sweetDetails;
	$: commentList = data.commentList;
</script>

<div class="flex flex-col items-center min-h-screen">
	<SweetCard interaction={sweetDetail} isMain={true} />
	{#if commentList}
		{#each commentList as comment (comment.commentId)}
			<div class="pt-1 border-l border-gray-300 ml-3 pl-2">
				<SweetCard interaction={comment} type="comment" />
			</div>
		{/each}
	{/if}
</div>
