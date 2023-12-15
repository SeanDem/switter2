import type { UserProfile } from '$lib/server/modules/userProfile';
import { writable } from 'svelte/store';

export const userProfileStore = writable<Partial<UserProfile>>();
