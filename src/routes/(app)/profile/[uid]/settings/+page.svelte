<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { UserProfile } from '$lib/server/modules/userProfiles';
	import { userStore } from '$lib/store/store';
	import { supabase } from '$lib/supabaseClient';

	export let data: { userProfile: UserProfile };
	let { handle, name, bio, phone, email, birthday } = data.userProfile;

	let file: any;
	function logout() {
		supabase.auth.signOut();
		document.cookie = 'uid=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
		userStore.set(null);
		goto('/');
	}
</script>

<div class="flex flex-col min-h-screen justify-start items-center">
	<div class="w-full max-w-md bg-white rounded-lg">
		<!-- <h1 class="text-2xl font-bold mb-4 text-center">Profile Settings</h1> -->
		<form use:enhance method="post" class="form-control">
			<div class="form-control">
				<div class="flex justify-between items-center">
					<label for="profilePicture" class="label cursor-pointer">
						<span class="label-text mr-2">Profile Picture: (not yet working)</span>
					</label>
					<label class="btn btn-primary cursor-pointer">
						Choose File
						<input
							id="profilePicture"
							type="file"
							name="profilePicture"
							accept="image/*"
							class="hidden"
							bind:files={file}
						/>
					</label>
				</div>
			</div>

			<div class="form-control">
				<label for="name" class="label">
					<span class="label-text">Name:</span>
				</label>
				<input max="60" type="string" name="name" bind:value={name} class="input input-bordered" />
			</div>

			<div class="form-control">
				<label for="handle" class="label">
					<span class="label-text">Handle:</span>
				</label>
				<input
					max="50"
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
				<input max="250" type="text" name="bio" bind:value={bio} class="input input-bordered" />
			</div>

			<div class="form-control">
				<label for="phone" class="label">
					<span class="label-text">Phone:</span>
				</label>
				<input type="tel" name="phone" bind:value={phone} class="input input-bordered" />
			</div>

			<div class="form-control">
				<label for="email" class="label">
					<span class="label-text">Email:</span>
				</label>
				<input
					max="100"
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

			<button type="submit" class="btn btn-primary mt-4 w-full">Save Profile</button>
		</form>

		<div class="mt-4 text-center">
			<button on:click={logout} class="btn btn-outline">Logout</button>
		</div>
	</div>
</div>
