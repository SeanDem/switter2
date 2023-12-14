<script lang="ts">
	export let data;
	$: conversations = data.conversations;
</script>

<h2>Messages</h2>

{#each conversations as conversation}
	<div>{conversation.conversationId}</div>
	<div>{conversation.uid}</div>
{/each}
