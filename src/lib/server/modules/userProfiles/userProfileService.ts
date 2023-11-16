import { badWordFilter, cleanInput } from '$lib/server/utils/badWords';
import { UserProfileDAO, type UserProfile, type UserProfilePartial } from '.';
import { FollowDao } from '../followers/followerDao';

export class UserProfileService {
	static async createUserProfile(userProfile: UserProfile): Promise<UserProfile> {
		userProfile.bio = cleanInput(userProfile.bio);
		userProfile.name = cleanInput(userProfile.name) ?? userProfile.name;
		userProfile.handle = cleanInput(userProfile.handle) ?? userProfile.handle;

		return UserProfileDAO.createUserProfile(userProfile);
	}

	static async getUserProfileById(
		uid: string,
		profileUid: string
	): Promise<UserProfilePartial | null> {
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
		userProfileUpdates: Partial<UserProfile>
	): Promise<UserProfile> {
		return UserProfileDAO.updateUserProfile(uid, userProfileUpdates);
	}

	static async deleteUserProfile(uid: string): Promise<boolean> {
		return UserProfileDAO.deleteUserProfile(uid);
	}

	static async getAllUserProfiles(): Promise<UserProfile[]> {
		return UserProfileDAO.getAllUserProfiles();
	}
}
