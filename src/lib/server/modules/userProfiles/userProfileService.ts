import { cleanInput } from '$lib/server/ServerUtils/badWords';
import { executeWithApiResponse } from '$lib/server/ServerUtils/utils';
import { UserProfileDAO, type UserProfile, type UserProfilePartial } from '.';
import { FollowDao } from '../followers/followerDao';
import type { APIResponse } from '../types/types';

export class UserProfileService {
	static async createUserProfile(
		userProfile: UserProfile
	): Promise<APIResponse<UserProfile | null>> {
		return executeWithApiResponse<UserProfile>(async () => {
			userProfile.bio = cleanInput(userProfile.bio);
			userProfile.name = cleanInput(userProfile.name) ?? userProfile.name;
			userProfile.handle = cleanInput(userProfile.handle) ?? userProfile.handle;

			return UserProfileDAO.createUserProfile(userProfile);
		});
	}

	static async getUserProfileById(
		uid: string,
		profileUid: string
	): Promise<APIResponse<UserProfile | null>> {
		return executeWithApiResponse<UserProfile | null>(async () => {
			const [followerCount, followingCount, isFollowing, userProfile] = await Promise.all([
				FollowDao.getFollowerCount(profileUid),
				FollowDao.getFollowingCount(profileUid),
				FollowDao.isUserFollowing(uid, profileUid),
				UserProfileDAO.getUserProfileById(profileUid)
			]);

			if (!userProfile) return null;

			return {
				...userProfile,
				isFollowing: isFollowing,
				followerCount: followerCount,
				followingCount: followingCount
			};
		});
	}

	static async deleteUserProfile(uid: string): Promise<APIResponse<boolean | null>> {
		return executeWithApiResponse<boolean>(async () => {
			return UserProfileDAO.deleteUserProfile(uid);
		});
	}
}
