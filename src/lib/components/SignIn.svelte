<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/utils/supabaseClient';

	let email = '';
	let password = '';
	let loginError: string = '';

	async function submit() {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			loginError = error.message;
			return;
		}
		document.cookie = `uid=${data.user.id}; path=/;`;
		goto('/');
	}
</script>

<div class="flex flex-col items-center my-8">
	<form on:submit|preventDefault={submit} class="flex flex-col gap-4 w-96">
		<div>
			<span class="label-text text-base-content">Email</span>
			<input
				required
				type="email"
				name="email"
				placeholder="Email"
				bind:value={email}
				class="input input-bordered w-full"
			/>
		</div>
		<div>
			<span class="label-text text-base-content">Password</span>
			<input
				required
				type="password"
				name="password"
				placeholder="Password"
				bind:value={password}
				class="input input-bordered w-full"
			/>
		</div>
		<button type="submit" class="btn btn-primary rounded">Submit</button>
	</form>

	{#if loginError}
		<p class="text-error mt-2">{loginError}</p>
	{/if}
</div>
<div class="flex flex-col items-center">
	<div>
		<span class="text-base-content pr-2"> Need an account? </span>
		<a class="btn rounded" href="/auth/signup"> SignUp </a>
	</div>
</div>
