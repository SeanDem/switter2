<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { Icon, ArrowPath } from 'svelte-hero-icons';
	export let showNavbar: boolean;
	$: isActive = (path: string) => $page.url.pathname === path;

	async function refreshPage() {
		await invalidateAll();
	}
</script>

<header
	class={`bg-base-100 fixed top-0 left-0 w-full z-10 transform transition-all duration-150 ${
		showNavbar ? 'top-0' : '-top-full'
	}`}
>
	<nav>
		<ul class="menu menu-horizontal">
			<li>
				<a class="text-xl {isActive('/') ? 'border-b-1 border-black' : ''}" href="/">Home</a>
			</li>
			<li>
				<a class="text-xl {isActive('/search') ? 'border-b-1 border-black' : ''}" href="/search"
					>Search</a
				>
			</li>
			<li>
				<a class="text-xl {isActive('/sweet') ? 'border-b-1 border-black' : ''}" href="/sweet"
					>Sweet</a
				>
			</li>
			<li>
				<a
					class="text-xl {$page.url.pathname.includes('/profile') ? 'border-b-1 border-black' : ''}"
					href="/profile">Profile</a
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
