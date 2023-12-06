<script lang="ts">
	import InteractionCardFocus from '$lib/components/InteractionCard/InteractionCardFocus.svelte';

	export let data;
	$: interaction = data.resweetDetail ?? null;
	$: commentDetailList = data.commentDetailList ?? [];
</script>

<InteractionCardFocus {interaction} {commentDetailList} />
