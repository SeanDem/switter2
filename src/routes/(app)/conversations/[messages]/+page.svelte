<script lang="ts">
	import { page } from '$app/stores';
	import BackButton from '$lib/components/BackButton.svelte';
	import { supabaseClient } from '$lib/utils/supabaseClient';
	import { onMount } from 'svelte';
	export let data;
	$: messages = data.messages;
	let message = '';

	onMount(() => {
		console.log('subscribing to messages');
		const channels = supabaseClient
			.channel('custom-insert-channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'message' },
				(payload) => {
					console.log('Change received!', payload);
				}
			)
			.subscribe();
	});

	async function handleSend() {
		await fetch(`/api/messages`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				text: message,
				conversationId: $page.params.messages
			})
		});
	}
</script>

<div class="flex justify-center">
	<BackButton />
</div>

{#each messages as message}
	<div>{message.text}</div>
	<div>{message.timestamp}</div>
{/each}

<input type="text" bind:value={message} />
<button on:click={handleSend}>Send</button>
