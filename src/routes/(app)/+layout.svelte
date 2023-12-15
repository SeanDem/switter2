<script lang="ts">
	import { browser } from '$app/environment';
	import Header from '$lib/components/Header.svelte';
	import { onDestroy, onMount } from 'svelte';

	let lastScrollY = 0;
	let showNavbar = true;

	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		showNavbar = currentScrollY < lastScrollY || currentScrollY < 50;
		lastScrollY = currentScrollY;
	};

	onMount(() => {
		if (browser) {
			window.addEventListener('scroll', handleScroll);
		}
	});
	onDestroy(() => {
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<main style="padding-top: var(--navbar-height);">
	<Header {showNavbar} />
	<div>
		<slot />
	</div>
	<footer />
</main>

<style>
	:root {
		--navbar-height: 5rem;
	}
</style>
