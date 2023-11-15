import { FollowerService } from '$lib/server/modules/followers/followerService.js';

export const load = async ({ params }) => {
	const followersList = await FollowerService.getFollowers(params.uid);
	return { followersList };
};
0