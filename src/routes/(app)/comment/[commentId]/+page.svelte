<script lang="ts">
	import InteractionCardFocus from '$lib/components/InteractionCard/InteractionCardFocus.svelte';

	export let data;
	$: interaction = data.commentDetail ?? null;
	$: parentInteraction = data.parentInteraction ?? null;
	$: commentDetailList = data.commentList ?? [];
</script>

<InteractionCardFocus {interaction} {commentDetailList} {parentInteraction} />
