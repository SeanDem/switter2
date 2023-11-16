import { FollowDao } from './followerDao';

export class FollowerService {
	static async getFollowers(uid: string) {
		return FollowDao.getFollowers(uid);
	}

	static async getFollowing(uid: string) {
		return FollowDao.getFollowing(uid);
	}

	static async follow(uid: string, followerUid: string): Promise<any> {
		const isFollowing = await FollowDao.isUserFollowing(uid, followerUid);

		if (isFollowing) return { message: 'User is already following.' };

		return FollowDao.follow(uid, followerUid);
	}

	static async unfollow(uid: string, followerUid: string) {
		return FollowDao.unfollow(uid, followerUid);
	}
}
