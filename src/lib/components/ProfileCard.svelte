<script lang="ts">
	import { enhance } from '$app/forms';
	import type { UserProfilePartial } from '$lib/server/modules/userProfile';
	import { unfollow, follow } from '$lib/services/follow';

	export let userProfile: UserProfilePartial = {
		uid: '',
		handle: '',
		name: '',
		bio: '',
		profileUrl: ''
	};

	function handleFollow(event: Event) {
		event.stopPropagation();
		userProfile.isFollowing ? unfollow(userProfile.uid) : follow(userProfile.uid);
		userProfile.isFollowing = !userProfile.isFollowing;
	}
</script>

<a href="/profile/{userProfile.uid}">
	<div class="flex flex-row items-center p-4 bg-white rounded-lg shadow-s card w-96 border-1">
		<div class="flex-grow flex flex-grow">
			<div class="flex-shrink-0">
				<img
					class="w-14 h-14 rounded-full"
					src={userProfile.profileUrl ||
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxroUOuhHpV9KBpOuiYJSvok9YOgMoxGfFnw&s'}
					alt="{userProfile.name}'s profile image"
				/>
			</div>
			<div class="flex-grow ml-4 text-left">
				<div class="font-semibold text-xl">{userProfile.name}</div>
				<div class="text-sm text-gray-500">@{userProfile.handle}</div>
				<div class="mt-2 text-base">{userProfile.bio}</div>
			</div>
		</div>
		<div class="flex flex-col justify-center">
			{#if userProfile.isFollowing}
				<button
					on:click|stopPropagation|preventDefault={handleFollow}
					class="btn btn-primary rounded w-24">Unfollow</button
				>
			{:else}
				<button on:click|stopPropagation|preventDefault={handleFollow} class="btn rounded w-24"
					>Follow</button
				>
			{/if}
		</div>
	</div>
</a>
