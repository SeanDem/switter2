import type { InteractionDetails } from '../interactions';

export type Resweet = {
	resweet_id: string;
	parent_resweet_id: string | null;
	sweet_id: string;
	uid: string;
	timestamp: Date;
	text: string | null;
};

export type ResweetDetails = Resweet & InteractionDetails;
