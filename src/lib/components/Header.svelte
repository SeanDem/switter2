<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import {
		ArrowLeft,
		ArrowPath,
		Home,
		Icon,
		MagnifyingGlass,
		Pencil,
		User
	} from 'svelte-hero-icons';
	export let showNavbar: boolean;

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

	function slideLeftAndShrink(node: HTMLDivElement) {
		const duration = 200;
		const distance = 10;
		const scaleAmount = 0.85;

		return {
			duration,
			css: (t: number) => `
            transform: translateX(${-distance * (1 - t)}px) scale(${
				1 - (1 - scaleAmount) * (1 - t)
			});
            opacity: ${t};
        `
		};
	}
	let isBack = false;
	function navigateBack() {
		isBack = true;
		setTimeout(() => {
			isBack = false;
		}, 200);
		window.history.back();
	}
</script>

<header
	class={`bg-base-100 border-b-2 fixed top-0 left-0 w-full max-w-none z-10 transition-transform duration-300 ${
		showNavbar ? 'translate-y-0' : '-translate-y-full'
	} font-normal text-base sm:text-lg overflow-hidden`}
>
	<nav class="flex justify-center items-center overflow-x-auto">
		<ul class="flex space-x-7 py-4 font-semibold uppercase">
			{#if !isBack}
				<div>
					<button on:click={navigateBack}>
						<Icon class="w-9 h-9" src={ArrowLeft} />
					</button>
				</div>
			{:else}
				<div in:slideLeftAndShrink>
					<button disabled>
						<Icon class="w-9 h-9" src={ArrowLeft} />
					</button>
				</div>
			{/if}

			<li class="flex items-center">
				<a class="text-xl pb-2 {isActive('/') ? 'border-b-2 border-black' : ''}" href="/"
					><span class="hidden sm:block">Home</span>
					<Icon class="block sm:hidden w-9 h-9" src={Home} /></a
				>
			</li>
			<li class="flex items-center">
				<a
					class="text-xl pb-2 {isActive('/search') ? 'border-b-2 border-black' : ''}"
					href="/search"
				>
					<span class="block hidden sm:block">Search</span>
					<Icon class="block sm:hidden w-9 h-9" src={MagnifyingGlass} />
				</a>
			</li>
			<li class="flex items-center">
				<a class="text-xl pb-2 {isActive('/sweet') ? 'border-b-2 border-black' : ''}" href="/sweet"
					><span class="block hidden sm:block">Sweet</span>
					<Icon class="block sm:hidden w-9 h-9" src={Pencil} /></a
				>
			</li>
			<li class="flex items-center">
				<a
					class="text-xl pb-2 {$page.url.pathname.includes('/profile')
						? 'border-b-2 border-black'
						: ''}"
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
