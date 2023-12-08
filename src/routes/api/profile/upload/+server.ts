import { UserProfileService } from '$lib/server/modules/userProfile/userProfileService.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const uid = cookies.get('uid');
	const formData = await request.formData();
	const profilePicture = formData.get('profilePicture');

	if (!(profilePicture instanceof File)) {
		return new Response(JSON.stringify({ error: 'No valid file uploaded' }), { status: 400 });
	}

	const res = await UserProfileService.uploadProfilePicture(profilePicture);
	return json({ res });
}
