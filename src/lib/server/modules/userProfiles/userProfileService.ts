import { UserProfileDAO, type UserProfile } from '.';

export class UserProfileService {
	static async createUserProfile(userProfile: UserProfile): Promise<UserProfile> {
		return UserProfileDAO.createUserProfile(userProfile);
	}

	static async getUserProfileById(uid: string): Promise<UserProfile | null> {
		return UserProfileDAO.getUserProfileById(uid);
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
