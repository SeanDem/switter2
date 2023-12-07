import { FollowerService } from '$lib/server/modules/followers/followerService.js';

export const load = async ({ params }) => {
	const followersListRes = await FollowerService.getFollowers(params.uid);
	const followersList = followersListRes.data;
	return { followersList };
};
