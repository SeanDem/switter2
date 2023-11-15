import { supabase } from '$lib/supabaseClient';

export class FollowerDao {
	static async getFollowers(uid: string) {
		let { data, error } = await supabase
			.from('userfollowers')
			.select(
				`
        follower_id (followerId),
        timestamp,
        follower:UserProfile!follower_uid (
          uid, 
          handle, 
          name, 
          profile_url (profileUrl), 
          bio
        )
      `
			)
			.eq('followee_uid', uid);

		if (error) throw error;

		return data;
	}

	static async getFollowing(uid: string) {
		let { data, error } = await supabase
			.from('userfollowers')
			.select(
				`
        follower_id (followerId),
        timestamp,
        followee:UserProfile!followee_uid (
          uid, 
          handle, 
          name, 
          profile_url (profileUrl), 
          bio
        )
      `
			)
			.eq('follower_uid', uid);

		if (error) throw error;

		return data;
	}
}
