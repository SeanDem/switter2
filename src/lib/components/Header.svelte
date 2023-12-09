<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { ArrowPath, Icon } from 'svelte-hero-icons';
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

	function outro(node: any) {
		return {
			duration: 1,
			css: () => `transform: rotate(360deg);`
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
		showNavbar ? 'translate-y-0' : '-translate-y-full'
	} font-normal text-base sm:text-lg overflow-hidden`}
>
	<nav class="flex justify-center overflow-x-auto">
		<ul class="flex space-x-4 px-2 py-4 font-semibold uppercase">
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
				{#if !isRotating}
					<button on:click={refreshPage}>
						<Icon src={ArrowPath} name="refresh" class="w-7 h-7" />
					</button>
				{:else}
					<button>
						<div in:rotate out:outro>
							<Icon src={ArrowPath} class="w-7 h-7" />
						</div>
					</button>
				{/if}
			</li>
		</ul>
	</nav>
</header>
