import type { InteractionType } from '$lib/server/modules/interactions';
import type { constants } from 'buffer';
import { writable } from 'svelte/store';

export const selectedHomeCategoryStore = writable('following');
