<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="min-h-screen flex justify-center bg-white mt-3">
	<div class="bg-white p-2 w-96">
		<h2 class="text-2xl font-bold mb-2">Create a Tweet</h2>
		<form use:enhance method="post" action="?/create">
			<div class="mb-1">
				<textarea
					id="tweet"
					maxlength="150"
					name="tweet"
					class="w-full p-2 rounded border border-gray-300 resize-none mb-2 outline-none h-28 focus:outline-none"
					placeholder="Compose your tweet"
					required
				/>
			</div>
			<div class="flex justify-between">
				<a type="button" href="/" class="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded"
					>Cancel</a
				>
				<button type="submit" class="bg-black text-white font-semibold px-4 py-2 rounded"
					>Create Tweet</button
				>
			</div>
		</form>
	</div>
</div>
