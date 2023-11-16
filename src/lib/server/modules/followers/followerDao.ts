import { supabase } from '$lib/supabaseClient';
export class FollowDao {
	static async getFollowers(uid: string) {
		const _uid = uid;
		let { data, error } = await supabase.rpc('getuserprofiles', { _uid, type: '_followers' });
		if (error) throw new Error(error.details + error.message + error.hint);

		return data!;
	}

	static async getFollowing(uid: string) {
		const _uid = uid;
		let { data, error } = await supabase.rpc('getuserprofiles', { _uid, type: '_following' });
		if (error) throw new Error(error.details + error.message + error.hint);

		return data!;
	}
}
