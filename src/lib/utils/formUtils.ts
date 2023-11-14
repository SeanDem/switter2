import type { Interaction } from '$lib/server/modules/interactions';

export function assignParentType(object: Interaction, parentType: string, id: string): void {
	switch (parentType) {
		case 'sweet':
			if ('sweetId' in object) object.sweetId = id;
			break;
		case 'comment':
			if ('commentId' in object) object.commentId = id;
			else if ('parentCommentId' in object) object.parentCommentId = id;
			break;
		case 'resweet':
			if ('resweetId' in object) object.resweetId = id;
			else if ('parentResweetId' in object) object.parentResweetId = id;
			break;
		default:
			throw new Error('Invalid parent type');
	}
}

export async function extractInteractionData(
	request: Request,
	cookies: Map<string, string>
): Promise<FormDataResult> {
	const uid = cookies.get('uid');
	if (!uid) {
		throw { status: 401, error: { uid, missing: true } };
	}

	const form = await request.formData();
	const id = form.get('id');
	const parentType = form.get('parentType');
	let text = form.get('text');

	if (!id || !parentType) {
		throw { status: 400, error: { missing: true } };
	}
	if (typeof id !== 'string') {
		throw { status: 400, error: { invalid: true } };
	}
	if (typeof text !== 'string') {
		text = null;
	}
	if (parentType !== 'string') {
		throw { status: 400, error: { invalid: true } };
	}

	return { uid, id, parentType, text };
}

export type FormDataResult = {
	uid: string;
	id: string;
	parentType: string;
	text?: string | null;
};
