import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';

export let userStore = writable<User | null>(null);
