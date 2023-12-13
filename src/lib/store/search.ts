import { writable } from 'svelte/store';
import type { Interaction, InteractionType } from '$lib/server/modules/interactions';

interface SearchState {
	selectedCategory: InteractionType;
	searchText: string;
	interactionList: Interaction[];
}

const initialState: SearchState = {
	selectedCategory: 'sweet',
	searchText: '',
	interactionList: []
};

export const searchStore = writable<SearchState>(initialState);
