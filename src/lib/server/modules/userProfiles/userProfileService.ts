import { cleanInput } from '$lib/server/ServerUtils/badWords';
import { executeWithApiResponse } from '$lib/server/ServerUtils/utils';
import { UserProfileDAO, type UserProfile, type UserProfilePartial } from '.';
import { FollowDao } from '../followers/followerDao';
import type { APIResponse } from '../types/types';

export class UserProfileService {
	static async createUserProfile(userProfile: UserProfile): Promise<UserProfile> {
		userProfile.bio = cleanInput(userProfile.bio);
		userProfile.name = cleanInput(userProfile.name) ?? userProfile.name;
		userProfile.handle = cleanInput(userProfile.handle) ?? userProfile.handle;

		return UserProfileDAO.createUserProfile(userProfile);
	}

	static async getUserProfileById(uid: string, profileUid: string): Promise<UserProfile | null> {
		const [isFollowing, userProfile] = await Promise.all([
			FollowDao.isUserFollowing(uid, profileUid),
			UserProfileDAO.getUserProfileById(profileUid)
		]);

		if (!userProfile) return null;

		return {
			...userProfile,
			isFollowing: isFollowing
		};
	}

	static async updateUserProfile(
		uid: string,
		userProfileUpdates: UserProfile
	): Promise<APIResponse<boolean | null>> {
		if (await UserProfileDAO.emailExists(userProfileUpdates.email)) {
			return { status: 400, message: 'Email already exists' };
		}

		if (await UserProfileDAO.handleExists(userProfileUpdates.handle)) {
			return { status: 400, message: 'Handle already exists' };
		}

		return executeWithApiResponse(async () => {
			return UserProfileDAO.updateUserProfile(uid, userProfileUpdates);
		});
	}

	static async deleteUserProfile(uid: string): Promise<boolean> {
		return UserProfileDAO.deleteUserProfile(uid);
	}

	static async getAllUserProfiles(): Promise<UserProfile[]> {
		return UserProfileDAO.getAllUserProfiles();
	}
}
