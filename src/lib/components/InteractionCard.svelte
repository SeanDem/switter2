<script lang="ts">
	import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
	import { formatDateDetailed, formatDateSmall } from '$lib/utils/utils';
	import ActionBar from './actions/ActionBar.svelte';
	export let interaction: Interaction;
	export let type: InteractionType = 'sweet';
	export let isMain = false;

	let url = '';
	$: {
		if (type === 'sweet') {
			url = `/sweet/${interaction.sweetId}`;
		} else if (type === 'resweet') {
			url = `/resweet/${interaction.resweetId}`;
		} else if (type === 'comment') {
			url = `/comment/${interaction.commentId}`;
		} else {
			url = '/';
		}
	}
</script>

<div
	class="card card-bordered shadow-s py-1 m-0 {isMain
		? 'w-110 py-2 my-1 border-slate-400	'
		: 'w-96'}"
>
	<a href={url}>
		<div class="flex">
			<div class="flex-shrink-0">
				<a href="/profile/{interaction.uid}">
					<img
						class="w-12 h-12 rounded-full"
						src={interaction?.profileUrl ??
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxroUOuhHpV9KBpOuiYJSvok9YOgMoxGfFnw&s'}
						alt="Profile image"
						aria-hidden="true"
					/>
				</a>
			</div>
			<div class="flex-grow ml-4 text-left">
				<a href="/profile/{interaction.uid}">
					<span class="text-lg font-semibold hover:underline mr-2">{interaction?.name}</span>
				</a>
				{#if isMain}
				<span class="text-sm text-gray-500">{formatDateDetailed(interaction?.timestamp)}</span>
				{:else}
				<span class="text-sm text-gray-500">{formatDateSmall(interaction?.timestamp)}</span>
				{/if}
				<div class="mt-2">
					<p>{interaction?.text}</p>
				</div>
			</div>
		</div>
	</a>
	<ActionBar {interaction} />
</div>
