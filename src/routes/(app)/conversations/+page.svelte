<script lang="ts">
	import { defaultProfileUrl } from '$lib/const.js';
	import { formatDateSmall } from '$lib/utils/dateutils.js';
	export let data;
	$: conversations = data.conversations;
</script>

<div class="flex justify-center flex-col items-center">
	{#each conversations as conversation}
		<a href="/conversations/{conversation.conversationId}" class="mb-2">
			<div
				class="flex flex-row items-center p-4 bg-white rounded-lg shadow-sm card w-96 border border-gray-200"
			>
				<div class="flex-shrink-0 pr-4">
					<img
						class="w-14 h-14 rounded-full"
						src={conversation.profileUrl || defaultProfileUrl}
						alt="{conversation.name}'s profile image"
					/>
				</div>
				<div class="flex-grow space-x-1">
					<span class="font-semibold text-lg">{conversation.name}</span>
					<span class="text-sm text-gray-500">@{conversation.handle}</span>
					<span class="text-xs text-gray-400">
						{formatDateSmall(conversation.lastMessageDate) || formatDateSmall(new Date().toLocaleString())}
					</span>
					<div class="mt-1 text-sm text-gray-600 truncate">
						{conversation.lastMessagePreview || 'Last Message Preview'}
					</div>
				</div>
			</div>
		</a>
	{/each}
</div>
