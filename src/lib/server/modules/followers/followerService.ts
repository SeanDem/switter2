import { FollowDao } from './followerDao';

export class FollowerService {
	static async getFollowers(uid: string) {
		return FollowDao.getFollowers(uid);
	}
	static async getFollowing(uid: string) {
		return FollowDao.getFollowing(uid);
	}
}
