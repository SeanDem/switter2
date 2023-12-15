import { writable } from 'svelte/store';

export const navBarStore = writable({ isScrolling: true, enabled: true });
