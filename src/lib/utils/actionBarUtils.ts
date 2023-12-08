import type { InteractionIdRequest } from '$lib/server/modules/interactions';

export function validateInteractionIdRequest(interactionIdRequest: InteractionIdRequest): void {
	let count = 0;
	if (interactionIdRequest.sweetId) count++;
	if (interactionIdRequest.resweetId) count++;
	if (interactionIdRequest.commentId) count++;

	if (count > 1) {
		throw new Error('Only one of sweetId, resweetId, or commentId should be provided.');
	} else if (count === 0) {
		throw new Error('No sweetId, resweetId, or commentId provided.');
	}
}
