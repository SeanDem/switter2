<script lang="ts">
	import { page } from '$app/stores';
	import BackButton from '$lib/components/BackButton.svelte';
	import { defaultProfileUrl } from '$lib/const.js';
	import { userProfileStore } from '$lib/store/userPorfileStore.js';
	import { formatDateSmall } from '$lib/utils/dateutils';
	import { supabaseClient } from '$lib/utils/supabaseClient';
	import type { RealtimeChannel } from '@supabase/supabase-js';
	import { onDestroy, onMount } from 'svelte';
	export let data;
	$: messages = data.messages;
	$: otherUserProfile = data.otherUserProfile;

	let message = '';
	let channels: RealtimeChannel;

	onMount(() => {
		channels = supabaseClient
			.channel('custom-insert-channel')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'message' }, (payload) => {
				const newMessage: MessageDb = payload.new as MessageDb;
				messages = [
					...messages,
					{
						conversationId: newMessage.conversation_id,
						text: newMessage.text,
						timestamp: newMessage.timestamp,
						messageId: newMessage.message_id,
						uid: newMessage.uid,
						mediaUrls: newMessage.media_urls
					}
				];
			})
			.subscribe();
	});
	onDestroy(() => {
		if (channels) channels.unsubscribe();
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
		message = '';
	}
	function handleKeyUp(event: { key: string }) {
		if (event.key === 'Enter') {
			handleSend();
		}
	}
</script>

<div class="flex items-center justify-center" style="max-height: calc(100vh - 5rem)">
	<div class="flex flex-col max-h-view max-w-md w-full" style="max-height: calc(100vh - 5rem)">
		<div class="flex items-center p-3 border-b-1 sticky z-10">
			<div class="mr-6">
				<BackButton />
			</div>
			<img
				src={otherUserProfile?.profileUrl || defaultProfileUrl}
				alt="Profile"
				class="w-10 h-10 rounded-full mr-3"
			/>
			<span class="font-semibold font-md mr-3">{otherUserProfile?.name}</span>
		</div>

		<div class="flex flex-grow flex-col-reverse my-1 overflow-y-auto no-scrollbar">
			<div class="w-full p-3">
				{#if $userProfileStore?.uid}
					{#each messages as message}
						{#if message.uid === $userProfileStore?.uid}
							<div class="chat chat-end">
								<div class="chat-header">
									<time class="text-xs opacity-50">{formatDateSmall(message.timestamp)}</time>
								</div>
								<div class="chat-bubble bg-blue-600 break-words">{message.text}</div>
							</div>
						{:else}
							<div class="chat chat-start">
								<div class="chat-header">
									<time class="text-xs opacity-50">{formatDateSmall(message.timestamp)}</time>
								</div>
								<div class="chat-bubble bg-slate-400 break-words">{message.text}</div>
							</div>
						{/if}
					{/each}
				{/if}
			</div>
		</div>

		<div class="p-3 border-t-1 sticky bottom-0 bg-white z-10 flex">
			<input
				class="flex grow input input-bordered rounded-lg input-accent w-full max-w-xs"
				type="text"
				placeholder="Start a new message"
				bind:value={message}
				on:keyup={handleKeyUp}
			/>
			<button class="ml-6 btn rounded-lg" on:click={handleSend}>Send</button>
		</div>
	</div>
</div>
