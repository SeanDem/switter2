<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form use:enhance method="post">
	<input type="text" name="text" placeholder="Your sweet message" required />
	<button type="submit">Create Sweet</button>
</form>
