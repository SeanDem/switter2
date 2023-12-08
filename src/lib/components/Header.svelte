<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { ArrowPath, Icon } from 'svelte-hero-icons';
	export let showNavbar: boolean;
	$: isActive = (path: string) => $page.url.pathname === path;
	let isRotating = false;
	async function refreshPage() {
		isRotating = true;
		await invalidateAll();
		window.scrollTo(0, 0);
		setTimeout(() => (isRotating = false), 1000); // Example duration
	}

	function rotate(node: HTMLButtonElement, { duration }: { duration: number }) {
		return {
			duration,
			css: (t: number) => `transform: rotate(${t * 360}deg);`
		};
	}
</script>

<header
	class={`bg-base-100 border-b-2 fixed top-0 left-0 w-full max-w-none z-10 transform transition-all duration-200 ${
		showNavbar ? 'top-0' : '-top-20'
	} font-normal text-base sm:text-lg overflow-hidden`}
>
	<nav class="flex justify-center overflow-x-auto">
		<ul class="flex space-x-6 px-2 py-4 font-semibold uppercase">
			<li>
				<a class="text-xl pb-2 {isActive('/') ? 'border-b-2 border-black' : ''}" href="/">Home</a>
			</li>
			<li>
				<a
					class="text-xl pb-2 {isActive('/search') ? 'border-b-2 border-black' : ''}"
					href="/search">Search</a
				>
			</li>
			<li>
				<a class="text-xl pb-2 {isActive('/sweet') ? 'border-b-2 border-black' : ''}" href="/sweet"
					>Sweet</a
				>
			</li>
			<li>
				<a
					class="text-xl pb-2 {$page.url.pathname.includes('/profile')
						? 'border-b-2 border-black'
						: ''}"
					href="/profile">Profile</a
				>
			</li>
			<li>
				<button on:click={refreshPage} in:rotate={{ duration: 1000 }}>
					<Icon src={ArrowPath} name="refresh" class="w-7 h-7" />
				</button>
			</li>
		</ul>
	</nav>
</header>
