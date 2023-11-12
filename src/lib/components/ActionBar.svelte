<!-- <script lang="ts">
	import type { SweetDetail } from "$lib/server/modules/sweets";

	export let sweetDetail: SweetDetail;
</script>

<div class="h-px bg-gray-200" />
<div class="w-full flex justify-start">
	<div
		class="flex-grow text-center"
		class:bg-green-400={sweetDetail.isCommented}
		class:bg-red-400={!sweetDetail.isCommented}
	/>
	<button
		class="flex-grow"
		class:bg-green-400={sweetDetail.isReSweeted}
		class:bg-red-400={!sweetDetail.isReSweeted}
	>
		🔁 {sweetDetail.sweet.retweetsCount ?? 0}
	</button>
	<button
		class="flex-grow"
		class:bg-green-400={sweetDetail.isLiked}
		class:bg-red-400={!sweetDetail.isLiked}
	>
		👍 {sweetDetail ?? 0}
	</button>
</div>
<div class="h-px bg-gray-200" /> -->
