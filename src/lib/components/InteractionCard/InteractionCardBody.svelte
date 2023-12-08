<script lang="ts">
	import type { Interaction } from '$lib/server/modules/interactions';
	import { formatDateDetailed, formatDateSmall } from '$lib/utils/utils';
	export let interaction: Interaction | null = null;
	export let isMain = false;
</script>

<div class="flex p-4">
	<div class="flex-shrink-0">
		<a href="/profile/{interaction?.uid}">
			<img
				class="{isMain ? 'w-14 h-14' : 'w-12 h-12'} rounded-full"
				src={interaction?.profileUrl ??
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxroUOuhHpV9KBpOuiYJSvok9YOgMoxGfFnw&s'}
				alt="Profile image"
				aria-hidden="true"
			/>
		</a>
	</div>
	<div class="flex-grow ml-4 text-left">
		<a href="/profile/{interaction?.uid}">
			<span class="font-semibold hover:underline mr-2 {isMain ? 'text-xl' : 'text-lg'}"
				>{interaction?.name}</span
			>
			{#if isMain}
				<a href="/profile/{interaction?.uid}">
					<span class="text-gray-500 text-s hover:underline mr-2">@{interaction?.handle}</span>
				</a>
			{/if}
		</a>
		{#if isMain}
			<div class="text-sm text-gray-500">{formatDateDetailed(interaction?.timestamp)}</div>
		{:else}
			<span class="text-sm text-gray-500">{formatDateSmall(interaction?.timestamp)}</span>
		{/if}
		{#if !isMain}
			<div class="flex items-start">
				<a href="/profile/{interaction?.uid}" class="flex items-start">
					<span class="text-gray-500 text-xs hover:underline mr-2">@{interaction?.handle}</span>
				</a>
			</div>
		{/if}
		<div class="mt-2">
			<p class={isMain ? 'text-lg mb-2' : 'text-base'}>{interaction?.text}</p>
		</div>
	</div>
</div>
