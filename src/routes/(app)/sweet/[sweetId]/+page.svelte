<script lang="ts">
	import InteractionCardFocus from '$lib/components/InteractionCard/InteractionCardFocus.svelte';
	import type { Interaction } from '$lib/server/modules/interactions';

	export let data: { sweetDetails: Interaction; commentList: Interaction[] };
	$: interaction = data.sweetDetails;
	$: commentDetailList = data.commentList;
</script>

<InteractionCardFocus {interaction} {commentDetailList} />
