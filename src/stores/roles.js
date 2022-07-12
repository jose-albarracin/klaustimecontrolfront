import { writable } from 'svelte/store';
//import { /* user, */ getStorageUserVar } from './login';

export let users = writable();

export let admin = writable();

export let superAdmin = writable();
