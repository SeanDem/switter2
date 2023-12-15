<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { navBarStore } from '$lib/store/shellStore';
	import { onMount } from 'svelte';
	import {
		ArrowPath,
		Envelope,
		Home,
		Icon,
		MagnifyingGlass,
		Pencil,
		User
	} from 'svelte-hero-icons';

	const refreshDuration = 1000;
	let isRotating = false;
	$: isActive = (path: string) => $page.url.pathname === path;

	onMount(() => {
		startRotate();
	});

	async function refreshPage() {
		startRotate();
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
		await invalidateAll();
	}

	function rotate(node: HTMLDivElement) {
		return {
			duration: refreshDuration,
			css: (t: number) => `transform: rotate(${t * 360}deg);`,
			delay: 0,
			easing: (t: number) => {
				const springiness = 4;
				return (
					Math.pow(2, -10 * t) * Math.sin(((t - springiness / 4) * (2 * Math.PI)) / springiness) + 1
				);
			}
		};
	}

	function startRotate() {
		isRotating = true;
		setTimeout(() => {
			isRotating = false;
		}, refreshDuration);
	}
</script>

<header
	class={`bg-base-100 border-b-2 fixed top-0 left-0 w-full max-w-none z-10 transition-transform duration-300 ${
		$navBarStore.isScrolling && $navBarStore.enabled ? 'translate-y-0' : '-translate-y-full'
	} font-normal text-base sm:text-lg overflow-hidden`}
>
	<nav class="flex justify-center items-center overflow-x-auto">
		<ul class="flex space-x-6 py-4 font-semibold uppercase">
			<li class="flex items-center">
				<a class="text-xl {isActive('/') ? 'border-b-2 border-black' : ''}" href="/"
					><span class="hidden sm:block">Home</span>
					<Icon class="block sm:hidden w-9 h-9" src={Home} /></a
				>
			</li>
			<li class="flex items-center">
				<a class="text-xl {isActive('/search') ? 'border-b-2 border-black' : ''}" href="/search">
					<span class="block hidden sm:block">Search</span>
					<Icon class="block sm:hidden w-9 h-9" src={MagnifyingGlass} />
				</a>
			</li>
			<li class="flex items-center">
				<a class="text-xl {isActive('/sweet') ? 'border-b-2 border-black' : ''}" href="/sweet"
					><span class="block hidden sm:block">Sweet</span>
					<Icon class="block sm:hidden w-9 h-9" src={Pencil} /></a
				>
			</li>
			<li class="flex items-center">
				<a
					class="text-xl {$page.url.pathname.includes('/conversations')
						? 'border-b-2 border-black'
						: ''}"
					href="/conversations"
				>
					<span class="block hidden sm:block">Messages</span>
					<Icon class="block sm:hidden w-9 h-9" src={Envelope} />
				</a>
			</li>
			<li class="flex items-center">
				<a
					class="text-xl {$page.url.pathname.includes('/profile') ? 'border-b-2 border-black' : ''}"
					href="/profile"
				>
					<span class="block hidden sm:block">Profile</span>
					<Icon class="block sm:hidden w-9 h-9" src={User} />
				</a>
			</li>

			<li class="flex items-center">
				{#if !isRotating}
					<button on:click={refreshPage}>
						<Icon src={ArrowPath} name="refresh" class="w-9 h-9" />
					</button>
				{:else}
					<button disabled>
						<div in:rotate>
							<Icon src={ArrowPath} class="w-9 h-9" />
						</div>
					</button>
				{/if}
			</li>
		</ul>
	</nav>
</header>
