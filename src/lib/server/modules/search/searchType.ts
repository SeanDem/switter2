import type { InteractionType } from "../interactions";

export type InteractionSearchRequest = {
	searchText: string;
	interactionType: InteractionType;
};
