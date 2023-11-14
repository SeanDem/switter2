import type { InteractionDetails } from '../interactions';

export type Resweet = {
	uid: string;
	timestamp?: Date | null;
	text?: string | null;
	resweetId?: string;
	parentResweetId?: string | null;
	sweetId?: string | null;
	commentId?: string | null;
};

export type ResweetDetails = Resweet & InteractionDetails;
