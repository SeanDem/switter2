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

<main class="pt-12">
	<Header {showNavbar} />
	<div class="my-10">
		<slot />
	</div>
	<footer />
</main>
