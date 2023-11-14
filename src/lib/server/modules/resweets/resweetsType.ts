import type { InteractionDetails } from '../interactions';

export type Resweet = {
	resweetId: string;
	parenResweetId: string | null;
	sweetId: string;
	uid: string;
	timestamp: Date;
	text: string | null;
};

export type ResweetDetails = Resweet & InteractionDetails;
