import type { InteractionDetails } from '../interactions';

export type Sweet = {
	sweetId?: string | null;
	uid: string;
	text: string;
	mediaUrls?: string;
	timestamp?: string | null;
	type?: string | null;
};

export type SweetDetails = Sweet & InteractionDetails;
