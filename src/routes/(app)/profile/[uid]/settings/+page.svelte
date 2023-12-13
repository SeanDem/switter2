<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { UserProfile } from '$lib/server/modules/userProfile/index.js';
	import { supabaseClient } from '$lib/utils/supabaseClient.js';
	export let form;
	export let data: { userProfile: UserProfile };
	let { handle, name, bio, phone, email, birthday } = data.userProfile;

	function logout() {
		supabaseClient.auth.signOut();
		document.cookie = 'uid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
		goto('/');
	}

	function clearFormMessage() {
		if (form?.message) {
			form.message = undefined;
		}
	}
	let file: File;
	async function handleProfile() {
		const formData = new FormData();
		const fileExtension = file.name.split('.').pop();
		const uniqueFileName =
			data.userProfile.uid +
			'_' +
			new Date().toISOString().replace(/:/g, '-') +
			'.' +
			fileExtension;
		formData.append('profilePicture', file, uniqueFileName);

		const response = await fetch('/api/profile/upload', {
			method: 'POST',
			body: formData
		});
	}
	function handleProfilePicChange(event: any) {
		file = event.target.files[0];
		if (file) {
			data.userProfile.profileUrl = URL.createObjectURL(file);
		}
	}
</script>

<div class="flex flex-col justify-start items-center">
	<div class="w-full max-w-sm bg-white rounded-lg">
		<div class="form-control">
			<div class="flex justify-around items-center">
				<label for="profilePicture" class="label cursor-pointer">
					<span class="label-text">Edit Profile Picture: </span>
				</label>
				<label for="profilePicture" class="cursor-pointer">
					<div class="avatar">
						<div class="flex-shrink-0 avatar w-32 rounded-full mr-4">
							<img
								src={data.userProfile.profileUrl ||
									'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxroUOuhHpV9KBpOuiYJSvok9YOgMoxGfFnw&s'}
								alt="{data.userProfile.name}'s profile image"
							/>
						</div>
					</div>
				</label>
				<input
					id="profilePicture"
					type="file"
					name="profilePicture"
					accept="image/jpeg, image/png"
					class="hidden"
					on:change={handleProfilePicChange}
				/>
			</div>
		</div>
		<form use:enhance method="post" class="form-control">
			<div class="form-control">
				<label for="name" class="label">
					<span class="label-text">Name:</span>
				</label>
				<input
					maxlength="30"
					type="string"
					name="name"
					bind:value={name}
					class="input input-bordered"
				/>
			</div>

			<div class="form-control">
				<label for="handle" class="label">
					<span class="label-text">Handle:</span>
				</label>
				<input
					on:focus={clearFormMessage}
					maxlength="20"
					type="text"
					name="handle"
					bind:value={handle}
					required
					class="input input-bordered"
				/>
			</div>

			<div class="form-control">
				<label for="bio" class="label">
					<span class="label-text">Bio:</span>
				</label>
				<input
					maxlength="250"
					type="text"
					name="bio"
					bind:value={bio}
					class="input input-bordered"
				/>
			</div>

			<div class="form-control">
				<label for="phone" class="label">
					<span class="label-text">Phone:</span>
				</label>
				<input
					on:focus={clearFormMessage}
					type="tel"
					name="phone"
					bind:value={phone}
					class="input input-bordered"
				/>
			</div>

			<div class="form-control">
				<label for="email" class="label">
					<span class="label-text">Email:</span>
				</label>
				<input
					on:focus={clearFormMessage}
					maxlength="100"
					type="email"
					name="email"
					bind:value={email}
					required
					class="input input-bordered"
				/>
			</div>

			<div class="form-control">
				<label for="birthday" class="label">
					<span class="label-text">Birthday:</span>
				</label>
				<input type="date" name="birthday" bind:value={birthday} class="input input-bordered" />
			</div>

			{#if form?.message}
				<div class="text-error my-2">{form?.message}</div>
			{/if}
			<button
				disabled={!!form?.message}
				on:click={handleProfile}
				type="submit"
				class="btn btn-primary mt-4 w-full">Save Profile</button
			>
		</form>

		<div class="mt-4 text-center">
			<button on:click={logout} class="btn btn-outline">Logout</button>
		</div>
	</div>
</div>
