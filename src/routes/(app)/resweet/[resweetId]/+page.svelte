<script lang="ts">
	import InteractionCardFocus from '$lib/components/InteractionCard/InteractionCardFocus.svelte';
	import type { CommentDetail } from '$lib/server/modules/comments';
	import type { ResweetDetails } from '$lib/server/modules/resweets';

	export let data: { resweetDetail: ResweetDetails; commentDetailList: CommentDetail[] };
	$: interaction = data.resweetDetail;
	$: commentDetailList = data.commentDetailList;
</script>

<InteractionCardFocus {interaction} {commentDetailList} />
