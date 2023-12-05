import { FollowerService } from '$lib/server/modules/followers/followerService.js';

export const load = async ({ params }) => {
	const followingList = await FollowerService.getFollowing(params.uid);
	return { followingList };
};
