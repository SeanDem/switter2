<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SweetDetail } from '$lib/server/modules/sweets';

	export let sweetDetail: SweetDetail;
</script>

<!-- <div class="shadow-md w-96 bg-theme-bg rounded p-4">
	<div
		class="cursor-pointer hover:bg-gray-200"
		role="button"
		tabindex="0"
		on:keydown={() => {}}
		on:click={() => goto(`/sweet/${sweetDetail.sweet.id}`)}
	>
		<div class="flex items-center mb-2">
			<span class="font-bold text-theme-text">{sweetDetail.user.displayName}</span>
			<span class="text-theme-secondary ml-2">@{sweetDetail.user.handle}</span>
			<span class="text-gray-500 ml-2">{formatDateSmall(sweetDetail.sweet.timestamp)}</span>
		</div>
		<p class="text-theme-text">{sweetDetail.sweet.text}</p>
	</div>

	<ActionBar {sweetDetail} />
</div> -->
