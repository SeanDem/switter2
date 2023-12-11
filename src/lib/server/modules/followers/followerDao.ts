import { supabaseService } from '$lib/server/utils/supabaseService';

export class FollowDao {
	static async getFollowers(uid: string) {
		const _uid = uid;
		const { data, error } = await supabaseService.rpc('getuserprofiles', {
			_uid,
			type: '_followers'
		});
		if (error) new Error(error.details + error.message + error.hint);
		return data!;
	}

	static async getFollowing(uid: string) {
		const _uid = uid;
		const { data, error } = await supabaseService.rpc('getuserprofiles', {
			_uid,
			type: '_following'
		});
		if (error) new Error(error.details + error.message + error.hint);

		return data!;
	}
	static async follow(followerUid: string, followeeUid: string): Promise<any> {
		const { data, error } = await supabaseService
			.from('userfollowers')
			.insert([{ follower_uid: followerUid, followee_uid: followeeUid }]);
		if (error) throw new Error(error.details + error.message + error.hint);

		return data!;
	}

	static async unfollow(followerUid: string, followeeUid: string): Promise<any> {
		const { data, error } = await supabaseService
			.from('userfollowers')
			.delete()
			.match({ follower_uid: followerUid, followee_uid: followeeUid });
		if (error) throw new Error(error.details + error.message + error.hint);

		return data!;
	}

	static async isUserFollowing(uid: string, profileUid: string): Promise<boolean> {
		const { data, error } = await supabaseService
			.from('userfollowers')
			.select('follower_id')
			.eq('follower_uid', uid)
			.eq('followee_uid', profileUid)
			.maybeSingle();

		if (error) throw new Error(error.details + error.message + error.hint);

		return !!data;
	}

	static async getFollowerCount(uid: string): Promise<number> {
		const { count, error } = await supabaseService
			.from('userfollowers')
			.select('follower_id', { count: 'exact' })
			.eq('followee_uid', uid);

		if (error) throw new Error(error.message);
		return count ?? 0;
	}

	static async getFollowingCount(uid: string): Promise<number> {
		const { count, error } = await supabaseService
			.from('userfollowers')
			.select('follower_id', { count: 'exact' })
			.eq('follower_uid', uid);

		if (error) throw new Error(error.message);
		return count ?? 0;
	}
}
