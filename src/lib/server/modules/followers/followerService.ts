import { FollowerDao } from './followerDao';

export class FollowerService {
	static async getFollowers(uid: string) {
		return FollowerDao.getFollowers(uid);
	}
	static async getFollowing(uid: string) {
		return FollowerDao.getFollowing(uid);
	}
}
