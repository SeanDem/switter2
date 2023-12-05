import type { UserProfilePartial } from '../userProfiles';
import { FollowDao } from './followerDao';
import { safeExecute } from '$lib/server/ServerUtils/utils';
export class FollowerService {
	static async getFollowers(uid: string): Promise<UserProfilePartial[]> {
		return FollowDao.getFollowers(uid);
	}

	static async getFollowing(uid: string): Promise<UserProfilePartial[]> {
		return FollowDao.getFollowing(uid);
	}

	static async follow(uid: string, followerUid: string): Promise<void> {
		if (uid === followerUid) throw new Error('User cannot follow themselves.');
		const isFollowing = await FollowDao.isUserFollowing(uid, followerUid);
		if (isFollowing) return Promise.resolve();

		return safeExecute(() => FollowDao.follow(uid, followerUid));
	}

	static async unfollow(uid: string, followerUid: string) {
		return safeExecute(() => FollowDao.unfollow(uid, followerUid));
	}
}
