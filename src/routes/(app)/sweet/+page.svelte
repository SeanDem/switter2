<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="min-h-screen flex justify-center bg-white mt-2">
	<div class="bg-white p-2 w-96">
		<form use:enhance method="post" action="?/create">
			<div class="mb-1">
				<textarea
					id="sweet"
					maxlength="200"
					name="sweet"
					class="w-full p-2 rounded border border-gray-300 resize-none mb-2 outline-none h-28 focus:outline-none"
					placeholder="Compose your sweet"
					required
				/>
			</div>
			<div class="flex justify-between">
				<a type="button" href="/" class="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded"
					>Cancel</a
				>
				<button type="submit" class="bg-black text-white font-semibold px-4 py-2 rounded"
					>Create Sweet</button
				>
			</div>
		</form>
	</div>
</div>
