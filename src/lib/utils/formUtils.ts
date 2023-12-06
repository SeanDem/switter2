import type { Interaction, InteractionIdRequest } from '$lib/server/modules/interactions';

export function createInteractionIdRequest(
	interactionIdRequest: Interaction | null
): InteractionIdRequest {
	return {
		commentId: interactionIdRequest?.commentId,
		sweetId: interactionIdRequest?.sweetId,
		resweetId: interactionIdRequest?.resweetId
	};
}

export type FormDataResult = {
	uid: string;
	id: string;
	parentType: string;
	text?: string | null;
};
