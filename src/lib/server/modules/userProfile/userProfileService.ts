import { cleanInput } from '$lib/server/utils/badWords';
import { resizeAndCompressImage } from '$lib/server/utils/img';
import { executeWithApiResponse } from '$lib/server/utils/utils';
import { UserProfileDAO, type UserProfile } from '.';
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
	static async updateUserProfile(
		uid: string,
		userProfileUpdates: UserProfile
	): Promise<APIResponse<boolean | null>> {
		try {
			if (await UserProfileDAO.emailExists(userProfileUpdates.email, uid)) {
				return { data: null, status: 400, message: 'Email already exists' };
			}

			if (await UserProfileDAO.handleExists(userProfileUpdates.handle, uid)) {
				return { data: null, status: 400, message: 'Handle already exists' };
			}
		} catch (error) {
			console.error(error);
			return { data: null, status: 400, message: 'unexpected error' };
		}

		return executeWithApiResponse(async () => {
			return UserProfileDAO.updateUserProfile(uid, userProfileUpdates);
		});
	}

	static async getUserProfileDetailsById(
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

	static async uploadProfilePicture(file: File, uid: string): Promise<APIResponse<string | null>> {
		return executeWithApiResponse<any>(async () => {
			const resizedFile = await resizeAndCompressImage(file, file.name);
			const {
				data: { publicUrl }
			} = await UserProfileDAO.uploadProfilePicture(resizedFile);

			await UserProfileDAO.updateUserProfileUrl(uid, publicUrl);
			return publicUrl;
		});
	}
	static async getUserProfileByUid(uid: string): Promise<APIResponse<UserProfile | null>> {
		return executeWithApiResponse<UserProfile | null>(async () => {
			return UserProfileDAO.getUserProfileById(uid);
		});
	}
}
