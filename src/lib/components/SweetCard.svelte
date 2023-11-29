<script lang="ts">
	import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
	import { formatDateSmall } from '$lib/utils/utils';
	import ActionBar from './actions/ActionBar.svelte';
	export let interaction: Interaction;
	export let type: InteractionType = 'sweet';
	export let isMain = false;
</script>

<div class="card card-bordered bg-base-100 shadow-s py-1 m-0 {isMain ? 'w-128 py-3 my-3' : 'w-96'}">
	<a href="/{type}/{interaction.sweetId}">
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
				<span class="text-sm text-gray-500">{formatDateSmall(interaction?.timestamp)}</span>
				<div class="mt-2">
					<p>{interaction?.text}</p>
				</div>
			</div>
		</div>
	</a>
	<ActionBar {interaction} />
</div>
