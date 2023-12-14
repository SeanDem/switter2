<script lang="ts">
	import { goto } from '$app/navigation';
	import type { UserProfile } from '$lib/server/modules/userProfile';
	import { supabaseClient } from '$lib/utils/supabaseClient';

	let userProfile: UserProfile = {
		name: '',
		handle: '',
		bio: '',
		uid: '',
		email: ''
	};
	let password: string = '';
	let confirmPassword: string = '';
	let signupError: string = '';

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		const { data, error } = await supabaseClient.auth.signUp({
			email: userProfile.email,
			password
		});
		if (error) {
			signupError = error.message;
			return;
		}
		const uid = data.user?.id;
		if (!uid) {
			signupError = 'No user ID returned';
			return;
		}
		userProfile.uid = uid;
		try {
			const { data, error } = await supabaseClient
				.from('userprofile')
				.insert([userProfile])
				.single();
			if (error) {
				signupError = error.message;
				return;
			}
			document.cookie = `uid=${uid}; path=/;`;
			goto('/');
		} catch (error) {
			signupError = 'Failed to create user profile';
		}
		handleProfile();
	}

	async function handleProfile() {
		const formData = new FormData();
		const uniqueFileName = userProfile.uid + '_' + new Date().toISOString().replace(/:/g, '-');
		formData.append('profilePicture', file, uniqueFileName);

		const response = await fetch('/api/profile/upload', {
			method: 'POST',
			body: formData
		});
	}
	let file: File;
	let profileUrl: string;
	function handleProfilePicChange(event: any) {
		file = event.target.files[0];
		if (file) {
			profileUrl = URL.createObjectURL(file);
		}
	}
</script>

<div class="flex flex-col items-center my-8">
	<div class="flex justify-around items-center">
		<label for="profilePicture" class="cursor-pointer">
			<div class="avatar">
				<div class="flex-shrink-0 avatar w-32 rounded-full mr-4">
					<img
						src={profileUrl ||
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxroUOuhHpV9KBpOuiYJSvok9YOgMoxGfFnw&s'}
						alt="{userProfile.name}'s profile image"
					/>
				</div>
				<input
					id="profilePicture"
					type="file"
					name="profilePicture"
					accept="image/jpeg, image/png, image/heic"
					class="hidden"
					on:change={handleProfilePicChange}
				/>
			</div>
		</label>
	</div>
	<form on:submit|preventDefault={submit} class="flex flex-col gap-4 w-96">
		<div>
			<span class="label-text text-base-content">Email</span>
			<input
				required
				type="email"
				bind:value={userProfile.email}
				placeholder="Email"
				class="input input-bordered w-full"
			/>
		</div>

		<div>
			<span class="label-text text-base-content">Password</span>
			<input
				required
				type="password"
				bind:value={password}
				placeholder="Password"
				class="input input-bordered w-full"
			/>
		</div>

		<div>
			<span class="label-text text-base-content">Confirm Password</span>
			<input
				required
				type="password"
				bind:value={confirmPassword}
				placeholder="Password"
				class="input input-bordered w-full"
				on:change={() => {
					if (password !== confirmPassword) {
						signupError = 'Passwords do not match';
					} else {
						signupError = '';
					}
				}}
			/>
		</div>

		<div>
			<span class="label-text text-base-content">Name</span>
			<input
				required
				type="text"
				bind:value={userProfile.name}
				placeholder="Name"
				class="input input-bordered w-full"
			/>
		</div>

		<div>
			<span class="label-text text-base-content">Handle</span>
			<input
				required
				type="text"
				bind:value={userProfile.handle}
				placeholder="Handle"
				class="input input-bordered w-full"
			/>
		</div>

		<div>
			<span class="label-text text-base-content">Bio</span>
			<input
				type="text"
				bind:value={userProfile.bio}
				placeholder="Bio"
				class="input input-bordered w-full"
			/>
		</div>

		<button type="submit" class="btn btn-primary">Submit</button>
	</form>

	{#if signupError}
		<p class="text-error mt-2">{signupError}</p>
	{/if}
</div>
<div class="flex flex-col items-center">
	<div>
		<span class="text-base-content pr-2"> Already have an account? </span>
		<a class="btn rounded" href="/auth/signin"> SignIn </a>
	</div>
</div>
