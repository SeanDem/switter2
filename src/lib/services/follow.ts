import { supabaseClient } from '$lib/utils/supabaseClient';

export async function follow(followUid?: string) {
	if (!followUid) return;
	const res = await fetch('/api/action/follow', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(followUid)
	});
	return res.json();
}
export async function unfollow(followUid?: string) {
	if (!followUid) return;
	const res = await fetch('/api/action/unfollow', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(followUid)
	});
	return res.json();
}

export async function isUserFollowing(uid?: string, profileUid?: string): Promise<boolean> {
	if (!uid || !profileUid) return false;
	const { data, error } = await supabaseClient
		.from('userfollowers')
		.select('follower_id')
		.eq('follower_uid', uid)
		.eq('followee_uid', profileUid)
		.maybeSingle();

	if (error) throw new Error(error.details + error.message + error.hint);
	return !!data;
}
