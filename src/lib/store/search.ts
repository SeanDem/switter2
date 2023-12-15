import { writable } from 'svelte/store';
import type { Interaction, InteractionType } from '$lib/server/modules/interactions';
import type { UserProfilePartial } from '$lib/server/modules/userProfile';

export type searchType = InteractionType | 'profile';
interface SearchState {
	selectedCategory: searchType;
	searchText: string;
	interactionList: Interaction[];
	profileList: UserProfilePartial[];
}

const initialState: SearchState = {
	selectedCategory: 'sweet',
	searchText: '',
	interactionList: [],
	profileList: []
};

export const searchStore = writable<SearchState>(initialState);
