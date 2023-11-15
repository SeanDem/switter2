<script lang="ts">
	import SignIn from '$lib/components/SignIn.svelte';
	import SignUp from '$lib/components/SignUp.svelte';
	import type { User } from '@supabase/supabase-js';
	export let form;

	$: label = signIn ? 'Sign Up' : 'Sign In';
	$: prefix = signIn ? 'Need an account?' : 'Already have an account?';
	let signIn = true;
</script>

{#if signIn}
	<SignIn />
{:else}
	<SignUp />
{/if}
{#if form?.message}
	<div>{form?.message}</div>
{/if}
<br />
<div>
	<span>{prefix}</span>
	<button
		on:click={() => {
			signIn = !signIn;
		}}>{label}</button
	>
</div>
