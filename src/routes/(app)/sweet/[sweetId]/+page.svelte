<script lang="ts">
	import InteractionCardFocus from '$lib/components/InteractionCard/InteractionCardFocus.svelte';
	
	export let data;
	$: interaction = data.sweetDetails ??  null;
	$: commentDetailList = data.commentList ?? [];
</script>

<InteractionCardFocus {interaction} {commentDetailList} />
