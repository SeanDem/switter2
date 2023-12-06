<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	export let data;
	onMount(() => {
		console.log($page);
	});
	$: userProfile = data.userProfile;
	$: isUserProfile = data.isUserProfile;
	$: isActive = (type: string) => $page.url.pathname === createPath(type);
	$: createPath = (type: string) => `/profile/${userProfile.uid}/${type}`;
</script>

<div class="flex justify-center mt-4">
	<div class="flex flex-col items-center bg-white rounded-lg shadow-s card w-130 pb-1">
		<div class="flex flex-row w-full">
			<div class="flex flex-row flex-grow items-center">
				<div class="flex-shrink-0 avatar">
					<div class="w-28 rounded-xl ronded-full">
						<img
							src={userProfile.profileUrl ||
								'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxroUOuhHpV9KBpOuiYJSvok9YOgMoxGfFnw&s'}
							alt="{userProfile.name}'s profile image"
						/>
					</div>
				</div>
				<div class="flex-grow">
					<div class="font-semibold text-2xl">
						{isUserProfile ? 'Your Profile' : userProfile.name}
					</div>
					<div class="text-gray-500">@{userProfile.handle}</div>
					{#if userProfile.birthday}
						<div class="text-gray-500">Birthday: {userProfile.birthday}</div>
					{/if}
				</div>
			</div>

			<div class="flex flex-col justify-center ml-4">
				{#if isUserProfile}
					<a href="/profile/{userProfile.uid}/settings" class="btn btn-primary rounded w-24"
						>Settings</a
					>
				{:else}
					<form use:enhance method="post">
						<input type="hidden" name="otherUid" value={userProfile.uid} />
						{#if userProfile.isFollowing}
							<button formaction="/profile/?/unfollow" class="btn btn-primary rounded w-24"
								>Unfollow</button
							>
						{:else}
							<button formaction="/profile/?/follow" class="btn btn rounded w-24">Follow</button>
						{/if}
					</form>
				{/if}
			</div>
		</div>
		<div class="flex text-gray-500 mb-3">
			{userProfile.bio}
		</div>
		<div class="flex flex-row w-full justify-around pb-4 mb-3 border-b-1">
			<a
				class="text-lg {isActive('followers') ? 'border-b-1 border-black' : ''}"
				href={createPath('followers')}
				><span class="font-bold mr-2">100</span> <span class="text-gray-500">Followers</span></a
			>
			<a
				class="text-lg {isActive('following') ? 'border-b-1 border-black' : ''}"
				href={createPath('following')}
				><span class="font-bold mr-2">100</span> <span class="text-gray-500">Following</span></a
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
<slot />
