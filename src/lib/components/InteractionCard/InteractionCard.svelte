<script lang="ts">
	import type { Interaction } from '$lib/server/modules/interactions';
	import { handleMessageUser } from '$lib/services/message';
	import { EllipsisVertical, Icon } from 'svelte-hero-icons';
	import ActionBar from '../actionBar/ActionBar.svelte';
	import InteractionCardBody from './InteractionCardBody.svelte';
	import { onMount } from 'svelte';
	import { userProfileStore } from '$lib/store/userPorfileStore';
	import { follow, isUserFollowing, unfollow } from '$lib/services/follow';

	export let parentInteraction: Interaction | null = null;
	export let interaction: Interaction | null;
	export let isMain = false;
	let isFollowing = false;

	onMount(async () => {
		isFollowing = await isUserFollowing($userProfileStore.uid, interaction?.uid);
	});
</script>

<div class="card rounded-lg border-1 {isMain ? 'w-115 mb-2 border-slate-300' : 'w-96 '}">
	{#if parentInteraction}
		<div class=" border-l border-gray-300pt-0 pl-1 pb-6 ml-6 mt-2">
			<a href="/{parentInteraction.type}/{parentInteraction.actionId}">
				<InteractionCardBody interaction={parentInteraction} />
				<ActionBar {interaction} />
			</a>
		</div>
	{/if}
	<div class="dropdown flex justify-end items-start h-full relative mb-[-2vh]">
		<a href="/{interaction?.type}/{interaction?.actionId}" class="flex-grow">
			<div class="invisible">Clickable Area</div>
		</a>
		<button id="dropdownButton" class="absolute right-0 top-0">
			<Icon src={EllipsisVertical} class="h-7 w-7 p-1" />
		</button>
		<ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
			<li><a href="/profile/{interaction?.uid}">Profile</a></li>
			{#if $userProfileStore.uid && $userProfileStore.uid !== interaction?.uid}
				{#if isFollowing}
					<li>
						<button
							on:click={() => {
								unfollow(interaction?.uid);
								isFollowing = false;
								interaction = interaction;
							}}>Unfollow</button
						>
					</li>
				{:else}
					<li>
						<button
							on:click={() => {
								follow(interaction?.uid);
								isFollowing = true;
								interaction = interaction;
							}}>Follow</button
						>
					</li>
				{/if}
				<li>
					<button on:click={() => handleMessageUser(interaction?.uid)}>Message</button>
				</li>
			{/if}
		</ul>
	</div>

	<a href="/{interaction?.type}/{interaction?.actionId}">
		<InteractionCardBody {interaction} {isMain} />
	</a>
	<ActionBar {interaction} />
</div>
