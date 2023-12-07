<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { ArrowPath, Icon } from 'svelte-hero-icons';
	export let showNavbar: boolean;
	$: isActive = (path: string) => $page.url.pathname === path;

	async function refreshPage() {
		await invalidateAll();
		window.scrollTo(0, 0);
	}
</script>

<header
	class={`bg-base-100 border-b-2 fixed top-0 left-0 w-full max-w-none z-10 transform transition-all duration-200 ${
		showNavbar ? 'top-0' : '-top-20'
	}`}
>
	<nav class="flex justify-center overflow-x-auto">
		<ul class="flex space-x-4 px-4 py-2 font-bold">
			<li>
				<a class="text-xl {isActive('/') ? 'border-b-2 border-black' : ''}" href="/">Home</a>
			</li>
			<li>
				<a class="text-xl {isActive('/search') ? 'border-b-2 border-black' : ''}" href="/search"
					>Search</a
				>
			</li>
			<li>
				<a class="text-xl {isActive('/sweet') ? 'border-b-2 border-black' : ''}" href="/sweet"
					>Sweet</a
				>
			</li>
			<li>
				<a class="text-xl {isActive('/profile') ? 'border-b-2 border-black' : ''}" href="/profile"
					>Profile</a
				>
			</li>
			<li>
				<button class="border-0" on:click={refreshPage}>
					<Icon src={ArrowPath} name="refresh" class="w-6 h-6" />
				</button>
			</li>
		</ul>
	</nav>
</header>
