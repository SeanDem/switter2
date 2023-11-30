<script lang="ts">
	import CommentCardList from '$lib/components/CommentCardList.svelte';
	import SweetCard from '$lib/components/InteractionCard.svelte';
	import type { Interaction } from '$lib/server/modules/interactions';

	export let data: { sweetDetails: Interaction; commentList: Interaction[] };
	$: sweetDetail = data.sweetDetails;
	$: commentDetailList = data.commentList;
</script>

<div class="flex flex-col items-center min-h-screen">
	<SweetCard interaction={sweetDetail} isMain={true} />
	<CommentCardList {commentDetailList} />
</div>
