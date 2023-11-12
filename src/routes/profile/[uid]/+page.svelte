<script lang="ts">
	import type { Sweet } from '$lib/server/modules/sweets';
	import type { UserProfile } from '$lib/server/modules/userProfiles';
	export let data: { userProfile: UserProfile, sweetList: Sweet[] };
	$: userProfile = data.userProfile;
	$: sweetList = data.sweetList;
</script>

{#if userProfile}
	<div>
		<h1>Profile</h1>
	</div>
{/if}

{#each sweetList as sweet}
	<div>{sweet.text}</div>
{/each}
