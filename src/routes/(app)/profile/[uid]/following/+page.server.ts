import { FollowerService } from '$lib/server/modules/followers/followerService.js';

export const load = async ({ params }) => {
	const followingListRes = await FollowerService.getFollowing(params.uid);
	const followingList = followingListRes.data;

	return { followingList };
};
