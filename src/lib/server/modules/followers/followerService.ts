import { safeExecuteList } from '$lib/server/ServerUtils/utils';
import type { UserProfilePartial } from '../userProfiles';
import { FollowDao } from './followerDao';
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

		return safeExecuteList(() => FollowDao.follow(uid, followerUid));
	}

	static async unfollow(uid: string, followerUid: string) {
		return safeExecuteList(() => FollowDao.unfollow(uid, followerUid));
	}
}
