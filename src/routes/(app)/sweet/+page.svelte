<script lang="ts">
	let sweetText = '';
	function handleSweet() {
		fetch('api/action/sweet', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(sweetText)
		});
		sweetText = '';
	}
</script>

<div class="min-h-screen flex justify-center bg-white">
	<div class="bg-white w-96">
		<div class="mb-1">
			<textarea
				id="sweet"
				maxlength="250"
				name="sweet"
				class="w-full p-2 rounded border border-gray-300 resize-none mb-2 outline-none h-28 focus:outline-none"
				placeholder="Compose your sweet"
				required
				bind:value={sweetText}
			/>
		</div>
		<div class="flex justify-between">
			<a type="button" href="/" class="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded"
				>Cancel</a
			>
			<button
				type="submit"
				on:click={handleSweet}
				class="bg-black text-white font-semibold px-4 py-2 rounded">Create Sweet</button
			>
		</div>
	</div>
</div>
