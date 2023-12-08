<script lang="ts">
	import { ClientLikeService } from '$lib/modules/LikeService';
	import type { Interaction } from '$lib/server/modules/interactions';
	import { createInteractionIdRequest } from '$lib/utils/formUtils';
	import { Heart, Icon } from 'svelte-hero-icons';

	export let interaction: Interaction;
	$: interactionIdRequest = createInteractionIdRequest(interaction);
	async function handleLike() {
		let res: any;
		if (interaction.isLiked) {
			res = await fetch('/api/action/unlike', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ interactionIdRequest })
			});
		} else {
			res = await fetch('/api/action/like', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ interactionIdRequest })
			});
		}
		interaction = {
			...interaction,
			isLiked: !interaction.isLiked,
			likesCount: interaction.isLiked ? interaction.likesCount - 1 : interaction.likesCount + 1
		};
	}
</script>

<button
	on:click|stopPropagation={handleLike}
	class="flex items-center space-x-1 border-none pl-5 pr-7"
	aria-label="Like"
>
	<Icon src={Heart} class={`h-7 w-10 ${interaction.isLiked ? 'text-pink-500' : 'text-black'}`} />
	<span class={`text-xs ${interaction.isLiked ? 'text-pink-500' : 'text-black'}`}
		>{interaction.likesCount}</span
	>
</button>
