<script lang="ts">
	import { ArrowLeft, Icon } from 'svelte-hero-icons';

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

<li class="flex items-center">
	{#if !isBack}
		<button on:click={navigateBack}>
			<Icon class="block w-9 h-9" src={ArrowLeft} />
		</button>
	{:else}
		<button disabled>
			<div in:slideLeftAndShrink>
				<Icon class=" block w-9 h-9" src={ArrowLeft} />
			</div>
		</button>
	{/if}
</li>
