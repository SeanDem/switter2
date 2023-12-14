<script lang="ts">
	import { page } from '$app/stores';
	import { defaultProfileUrl } from '$lib/const.js';
	import { follow, unfollow } from '$lib/services/follow.js';
	import { formatDateBirthday } from '$lib/utils/dateutils.js';
	import { supabaseClient } from '$lib/utils/supabaseClient.js';
	import { Cake, Envelope, Icon } from 'svelte-hero-icons';
	export let data;

	$: userProfile = data.userProfile;
	$: isUserProfile = data.isUserProfile;
	$: isActive = (type: string) => $page.url.pathname === createPath(type);
	$: createPath = (type: string) => `/profile/${userProfile.uid}/${type}`;

	async function handleFollow() {
		userProfile.isFollowing ? unfollow(userProfile.uid) : follow(userProfile.uid);
		userProfile.isFollowing = !userProfile.isFollowing;
	}

	function handleMessageUser() {
		console.log('message user');
	}
</script>

<div class="flex justify-center mb-4">
	<div class="flex flex-col items-center bg-white rounded-lg shadow-s card border-1 p-5 w-130 pb-1">
		<div class="flex w-full">
			<div class="flex w-full justify-between items-start">
				<div class="avatar w-40 items-center mt-[-8px] ml-[-2px]">
					<div class="flex-shrink-0 avatar w-24 rounded-full">
						<img
							src={userProfile.profileUrl || defaultProfileUrl}
							alt="{userProfile.name}'s profile image"
						/>
					</div>
				</div>
				<div class="flex flex-col items-center">
					<div class="font-semibold text-2xl">
						{isUserProfile ? 'Your Profile' : userProfile.name}
					</div>
					<div class="text-gray-500">@{userProfile.handle}</div>
					{#if userProfile.birthday}
						<div class="flex items-center">
							<Icon src={Cake} class="w-5 h-5 mr-2" />
							<span class="text-gray-500">{formatDateBirthday(userProfile.birthday)}</span>
						</div>
					{/if}
				</div>
				<div class="flex flex-col justify-start items-end w-40">
					{#if isUserProfile}
						<a
							href="/profile/{userProfile.uid}/settings"
							class="btn btn-sm rounded w-24 {isActive('settings') ? '' : 'btn-primary'}"
						>
							Settings
						</a>
					{:else}
						<button on:click={handleMessageUser}>
							<Icon src={Envelope} class="w-10" />
						</button>
						{#if userProfile.isFollowing}
							<button
								on:click|stopPropagation={handleFollow}
								class="btn btn-sm btn-primary rounded w-20">Unfollow</button
							>
						{:else}
							<button on:click|stopPropagation={handleFollow} class="btn btn rounded w-20"
								>Follow</button
							>
						{/if}
					{/if}
				</div>
			</div>
		</div>

		<div class="flex text-gray-500 mb-3 text-left">
			{userProfile.bio}
		</div>
		<div class="flex flex-row w-full justify-around pb-4 mb-3 border-b-1">
			<a
				class="text-lg border-b {isActive('followers') ? 'border-black' : 'border-white'}"
				href={createPath('followers')}
				><span class="font-bold mr-2">{userProfile.followerCount}</span>
				<span class="text-gray-500">Followers</span></a
			>
			<a
				class="text-lg border-b {isActive('following') ? ' border-black' : 'border-white'}"
				href={createPath('following')}
				><span class="font-bold mr-2">{userProfile.followingCount}</span>
				<span class="text-gray-500">Following</span></a
			>
		</div>

		<div class="flex flex-row w-full text-lg navbar-center font-bold justify-around pb-0 mb-1">
			<a
				class="flex {isActive('likes') ? 'border-b-1 border-black' : ''}"
				href="/profile/{userProfile.uid}/likes">Likes</a
			>
			<a
				class="flex {isActive('sweets') ? 'border-b-1 border-black' : ''}"
				href={createPath('sweets')}>Sweets</a
			>
			<a
				class="flex {isActive('comments') ? 'border-b-1 border-black' : ''}"
				href={createPath('comments')}>Comments</a
			>
			<a
				class="flex {isActive('resweets') ? 'border-b-1 border-black' : ''}"
				href={createPath('resweets')}>Resweets</a
			>
		</div>
	</div>
</div>
<div class="flex justify-center items-center flex-col">
	<slot />
</div>
