import { FollowDao } from './followerDao';

export class FollowerService {
	static async getFollowers(uid: string) {
		return FollowDao.getFollowers(uid);
	}

	static async getFollowing(uid: string) {
		return FollowDao.getFollowing(uid);
	}

	static async follow(uid: string, followerUid: string): Promise<void> {
		if (uid === followerUid) throw new Error('User cannot follow themselves.');
		const isFollowing = await FollowDao.isUserFollowing(uid, followerUid);
		if (isFollowing) return Promise.resolve();

		return FollowDao.follow(uid, followerUid);
	}

	static async unfollow(uid: string, followerUid: string) {
		return FollowDao.unfollow(uid, followerUid);
	}
}
