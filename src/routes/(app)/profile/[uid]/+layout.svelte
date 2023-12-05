<script lang="ts">
	import { enhance } from '$app/forms';
	import { Bars3, Icon } from 'svelte-hero-icons';
	export let data;

	$: userProfile = data.userProfile;
	$: isUserProfile = data.isUserProfile;
</script>

<div class="flex justify-center mt-4">
	<div class="flex flex-col items-center p-4 bg-white rounded-lg shadow-s card w-130 pb-1 pt-0">
		<div class="flex flex-row w-full">
			<div class="flex flex-row flex-grow items-center">
				<div class="flex-shrink-0 avatar">
					<div class="w-32 rounded-xl ronded-full">
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
		<div class="flex text-gray-500 pb-3">
			{userProfile.bio}
		</div>
		<div class="flex flex-row w-full">
			<div class="navbar bg-base-100">
				<div class="navbar-start">
					<div class="dropdown">
						<label tabindex="0" class="dropdown btn lg:hidden" for="bars-icon">
							<Icon src={Bars3} class="h-6 w-10" id="bars-icon" />
						</label>
						<ul
							class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
							role="menu"
							aria-label="Profile Menu"
						>
							<li><a href="/profile/{userProfile.uid}/sweets" role="menuitem">Sweets</a></li>
							<li><a href="/profile/{userProfile.uid}/comments" role="menuitem">Comments</a></li>
							<li><a href="/profile/{userProfile.uid}/resweets" role="menuitem">Resweets</a></li>
							<li><a href="/profile/{userProfile.uid}/followers" role="menuitem">Followers</a></li>
							<li><a href="/profile/{userProfile.uid}/following" role="menuitem">Following</a></li>
						</ul>
					</div>
				</div>
				<div class="navbar-center flex justify-around font-bold hidden border-0 pb-0 lg:flex">
					<a href="/profile/{userProfile.uid}/likes">Likes</a>
					<a href="/profile/{userProfile.uid}/sweets">Sweets</a>
					<a href="/profile/{userProfile.uid}/comments">Comments</a>
					<a href="/profile/{userProfile.uid}/resweets">Resweets</a>
					<a href="/profile/{userProfile.uid}/followers">Followers</a>
					<a href="/profile/{userProfile.uid}/following">Following</a>
				</div>
			</div>
		</div>
	</div>
</div>
<slot />
