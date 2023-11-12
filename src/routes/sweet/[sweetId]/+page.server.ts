import { SweetService } from '$lib/server/modules/sweets/sweetService';

export const load = async ({ params }) => {
	const sweetDetails = await SweetService.getSweetDetailsById(params.sweetId);
	console.log(sweetDetails);
	return { sweetDetails };
};
