import type { UserProfile } from '$lib/server/modules/userProfiles';
import { writable } from 'svelte/store';

export const userProfileStore = writable<UserProfile>;
