<script lang="ts">
	import { defaultProfileUrl } from '$lib/const';
	import type { UserProfilePartial } from '$lib/server/modules/userProfile';
	import { follow, unfollow } from '$lib/services/follow';
	import { userProfileStore } from '$lib/store/userPorfileStore';

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
					src={userProfile.profileUrl || defaultProfileUrl}
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
			{#if userProfile.uid !== $userProfileStore.uid}
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
			{/if}
		</div>
	</div>
</a>
