import type { InteractionDetails } from '../interactions';

export type Sweet = {
	sweetId: string;
	uid: string;
	text: string;
	media_urls: string;
	timestamp?: string | null;
	ref_Sweet_Id?: string | null;
	type?: string | null;
};

export type SweetDetails = Sweet & InteractionDetails;
