<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Interaction } from '$lib/server/modules/interactions';

	export let type: 'like' | 'comment' | 'resweet';
	export let interaction: Interaction;
	export let id: string;
	export let count: number;

	let showDialog = false;
	let text = '';
</script>

<button on:click={() => (showDialog = true)}>
	{type.charAt(0).toUpperCase() + type.slice(1)}s: {count}
</button>

{#if showDialog}
	<div class="dialog-overlay">
		<div class="dialog">
			<h2>Write a comment</h2>
			<form use:enhance method="post">
				<textarea name="text" bind:value={text} />
				<input type="hidden" name="type" value={type} />
				<input type="hidden" name="id" value={id} />
				<input type="hidden" name="interaction" value={interaction} />
				<button formaction="/?/{type}">Submit</button>
			</form>
			<button on:click={() => (showDialog = false)}>Cancel</button>
		</div>
	</div>
{/if}

<style>
	.dialog-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
	.dialog {
		background: white;
		padding: 20px;
		border-radius: 5px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
</style>
