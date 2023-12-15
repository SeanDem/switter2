<script lang="ts">
	import { browser } from '$app/environment';
	import Header from '$lib/components/Header.svelte';
	import { navBarStore } from '$lib/store/shellStore';
	import { onDestroy, onMount } from 'svelte';

	let lastScrollY = 0;
	const handleScroll = () => {
		const currentScrollY = window.scrollY;
		navBarStore.set({
			...$navBarStore,
			isScrolling: currentScrollY < lastScrollY || currentScrollY < 50
		});
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

<main
	style={$navBarStore.isScrolling && $navBarStore.enabled
		? 'padding-top: var(--navbar-height)'
		: ''}
>
	<Header />
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
