import { executeWithApiResponse } from '$lib/server/utils/utils';
import { APIResponse, HttpStatus } from '../types/types';
import type { UserProfilePartial } from '../userProfile';
import { FollowDao } from './followerDao';

export class FollowerService {
	static async getFollowers(uid: string): Promise<APIResponse<UserProfilePartial[]>> {
		return executeWithApiResponse(() => FollowDao.getFollowers(uid));
	}

	static async getFollowing(uid: string): Promise<APIResponse<UserProfilePartial[]>> {
		return executeWithApiResponse(() => FollowDao.getFollowing(uid));
	}

	static async follow(uid: string, followerUid: string): Promise<APIResponse<null>> {
		if (uid === followerUid) {
			return {
				data: null,
				status: HttpStatus.BadRequest,
				message: 'User cannot follow themselves.'
			};
		}
		const isFollowing = await FollowDao.isUserFollowing(uid, followerUid);
		if (isFollowing) {
			return {
				data: null,
				status: HttpStatus.OK,
				message: 'Already following.'
			};
		}
		return executeWithApiResponse(() => FollowDao.follow(uid, followerUid));
	}

	static async unfollow(uid: string, followerUid: string): Promise<APIResponse<void>> {
		return executeWithApiResponse(() => FollowDao.unfollow(uid, followerUid));
	}
}
